import { Component, DoCheck, Input, input } from "@angular/core";
import { DialogComponent } from "property-manager/src/app/components/dialog/dialog.component";
import { Toast } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MultiSelectModule } from "primeng/multiselect";
import { SliderModule } from "primeng/slider";
import { BudgetApiService, BuildingDetails, getCookieValue, ImageApiService, Inventory, InventoryItemApiService, InventoryUsageApiService, Notification, NotificationsApiService, TaskApiService, TaskProgresApiService } from "shared";
import { FileSelectEvent, FileUploadModule } from "primeng/fileupload";
import { MessageService } from "primeng/api";
import { ApiService } from 'shared';

@Component({
  selector: 'app-add-progress-dialog',
  templateUrl: './add-progress-dialog.component.html',
  styles: ``,
  imports: [Toast, DialogModule, ReactiveFormsModule, MultiSelectModule, CommonModule, FileUploadModule, SliderModule],
  providers: [MessageService, NotificationsApiService]
})
export class AddProgressDialogComponent extends DialogComponent implements DoCheck{
    
    form!: FormGroup;
    selectedFiles: File[] = [];
    public taskId = input.required<string>();
    @Input() inventoryItemsAvailable! : Map<string, number>;
    public inventoryItems: Inventory[] = [];
    public addError = false;
    isDone = false;
    
    constructor(
      private fb: FormBuilder, 
      private inventoryItemService: InventoryItemApiService, 
      private imageService: ImageApiService, 
      private messageService: MessageService, 
      private notificationService: NotificationsApiService,
      private taskProgressService: TaskProgresApiService,
      private inventoryUsageService: InventoryUsageApiService,
      private taskService: TaskApiService,
      private apiService: ApiService,
      private budgetService: BudgetApiService
    ){
      super();
      this.form = this.fb.group({
        description: ['', Validators.required],
        progress: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
      });
    }

    ngDoCheck() {
      if (this.inventoryItemsAvailable && this.inventoryItemsAvailable.size > 0 && this.inventoryItems.length === 0) {
        this.inventoryItemsAvailable.forEach((qty, id) => {
          this.inventoryItems.push(
            { 
              itemUuid: id, 
              name: '',
              unit: '',
              quantityInStock: qty,
              buildingUuid: '',
              price: 0
            }
          );
        });

        this.inventoryItems.forEach((i, index) => {
          this.inventoryUsageService.getInventoryUsageById(i.itemUuid).subscribe({
            next: (res) => {
              this.inventoryItemService.getInventoryItemsById(res.itemUuid).subscribe({
                next: (i) => {
                  this.inventoryItems[index].name = i.name;
                  this.inventoryItems[index].price = i.price;
                },
                error: (err) => {
                  console.error(err)
                }
              })
            }
          })
        })
      }
    }

    async onSubmit()
    {
      this.form.markAllAsTouched();
      this.isDone = false;
      if(this.form.valid)
      {
        this.addError = false;
      
        const contractorUuid = this.apiService.getCookieValue('contractorId');
        
        if (!contractorUuid) {
          throw new Error('Contractor UUID not found');
        }

        const des = this.form.value.description;
        const itemsUsed = this.getQuantities()[0];
        const progress = this.form.value.progress;
        const id = getCookieValue(document.cookie, 'contractorId');

        // STEP 1: Upload ALL images WITHOUT progress UUID (initially)
        let uploadedImageIds: string[] = [];
        let primaryImageId: string = "00000000-0000-0000-0000-000000000000";

        if(this.selectedFiles.length > 0) {
          //console.log('Uploading', this.selectedFiles.length, 'images without progress UUID...');
          try {
            // Upload with taskUuid only, no progressUuid yet
            uploadedImageIds = await this.imageService.uploadImages(
              this.selectedFiles, 
              contractorUuid,   // user_uuid
              this.taskId(),    // task_uuid
              undefined,        // progress_uuid - NOT YET AVAILABLE
              undefined         // building_uuid
            );

            //console.log('Upload complete. Image IDs received:', uploadedImageIds);

            if(uploadedImageIds && uploadedImageIds.length > 0) {
              primaryImageId = uploadedImageIds[0]; 
              //console.log('Using primary image ID:', primaryImageId);
              //console.log('Total images uploaded:', uploadedImageIds.length);
            } else {
              //console.log('No image IDs returned from upload.');
              this.messageService.add({
                severity: 'warn',
                summary: 'Warning',
                detail: 'Images may not have uploaded correctly'
              });
            }
          } catch(err) {
            console.error("Image upload failed", err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to upload images, please try again'
            });
            return;
          }
        } else {
          //console.log('No images selected for upload.');
        }

        //console.log('Creating progress with primary image ID:', primaryImageId);

        // STEP 2: Create progress with primary image ID
        this.taskProgressService.createProgress(id, this.taskId(), primaryImageId, des, progress).subscribe({
          next: async (progressResponse: any) => {
            //console.log('Progress created:', progressResponse);
            //console.log('Progress response keys:', Object.keys(progressResponse));
            
            // Extract progress UUID - check common field names
            const progressUuid = progressResponse.progressUuid || 
                                progressResponse.uuid || 
                                progressResponse.id ||
                                progressResponse.progress_uuid;

            //Update trustee budget if task progres == 100%
            if(progress === 100 )
            {
              this.isDone = true;
              //Get building id
              this.taskService.getTaskById(this.taskId()).subscribe({
                next: (res) => {
                  this.budgetService.getBudgetsByBuildingId(res.buuid).subscribe({
                    next: (b) => {
                      //Get latest budget 
                      let latestBudget: BuildingDetails;

                      if(b.length === 1)
                      {
                        latestBudget = b[0];
                      }
                      else
                      {
                        latestBudget = b.sort((a,b) => {
                          a.approvalDate = new Date(a.approvalDate);
                          b.approvalDate = new Date(b.approvalDate);

                          return b.approvalDate!.getDate() - a.approvalDate.getDate();
                        })[0]
                      }

                      //Get quote amount
                      this.taskService.getQuoteFromTaskId(res.uuid).subscribe({
                        next: (quote) => {
                          const filteredQuote = quote.filter(q => q.status === 'APPROVED')[0];

                          latestBudget.maintenanceBudget = latestBudget.maintenanceBudget - filteredQuote.amount;
                          latestBudget.approvalDate = new Date();

                          // Update maintenance budget
                          this.budgetService.updateBudget(latestBudget.budgetUuid, latestBudget).subscribe({
                            next: (ub) => {
                              //Send notification that the task has been completed
                              const noti: Notification = {
                                notificationType: "Task has been completed",
                                message: `Contractor has completed task ${res.title} and R${filteredQuote.amount} has been deducted from the budget`,
                                recipientType: 'trustee',
                                recipientUuid: res.tuuid,
                                isRead: false,
                                relatedTaskUuid: this.taskId()
                              };

                              this.notificationService.createNotifications(noti).subscribe();
                            }
                          });

                          //update status of task
                          this.taskService.updateTaskStatus("done", this.taskId(), false).subscribe();
                        }
                      });
                    }
                  })
                }
              })
            }
            
            // STEP 3: Update ALL image associations with progress UUID
            if (uploadedImageIds.length > 0 && progressUuid) {
              try {
                //console.log(`Updating ${uploadedImageIds.length} image associations with progress UUID:`, progressUuid);
                
                // Update all images in parallel
                const updatePromises = uploadedImageIds.map(async (imageId, index) => {
                  //console.log(`[${index + 1}/${uploadedImageIds.length}] Updating image ${imageId}`);
                  
                  try {
                    await this.imageService.updateImageAssociations(
                      imageId,          // imageId
                      contractorUuid,   // user_uuid
                      this.taskId(),    // task_uuid
                      progressUuid,     // progress_uuid - NOW AVAILABLE!
                      undefined         // building_uuid
                    );
                    //console.log(`✓ [${index + 1}/${uploadedImageIds.length}] Image ${imageId} updated`);
                  } catch (err) {
                    console.error(`✗ [${index + 1}/${uploadedImageIds.length}] Failed to update image ${imageId}:`, err);
                    throw err;
                  }
                });
                
                // Wait for all updates to complete
                await Promise.all(updatePromises);
                //console.log(`✓ All ${uploadedImageIds.length} images successfully updated with progress UUID`);
                
              } catch (err) {
                console.error('Failed to update some image associations:', err);
                // Non-critical error - progress is already created
                this.messageService.add({
                  severity: 'warn',
                  summary: 'Warning',
                  detail: 'Some images may not be fully associated'
                });
              }
            } else {
              console.warn('Could not update image associations:', {
                imageCount: uploadedImageIds.length,
                progressUuid,
                hasFiles: this.selectedFiles.length > 0
              });
            }

            // Continue with notifications
            if(!this.isDone)
            {
              this.taskService.getTaskById(this.taskId()).subscribe({
                next: (res) => {
                  const noti: Notification = {
                    notificationType: "Task progress updated",
                    message: `Contractor has updated progress on ${res.title}`,
                    recipientType: 'trustee',
                    recipientUuid: res.tuuid,
                    isRead: false,
                    relatedTaskUuid: this.taskId()
                  };
                  
                  this.notificationService.createNotifications(noti).subscribe({
                    next: () => {
                      this.messageService.add({
                        severity: 'success',
                        summary: 'Success',
                        detail: 'Task progress successfully added'
                      });
    
                      this.closeDialog();
                      setTimeout(() => {
                        window.location.reload();
                      }, 2000);
                    },
                    error: () => {
                      this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to send notification'
                      });
                    } 
                  });
                },
                error: () => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Task progress unsuccessfully added'
                  });
                }
              });
            }
          },
          error: (err) => {
            console.error('Failed to create progress:', err);
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to create task progress'
            });
          }
        });
      }
      else
      {
        this.addError = true;
      }
    }

    onFileSelect(event: FileSelectEvent){
      //console.log('FileSelectEvent received:', event);
      //console.log('event.files:', event.files);
      //console.log('event.currentFiles:', event.currentFiles);

      if(event.currentFiles && event.currentFiles.length > 0){
        this.selectedFiles = Array.from(event.currentFiles);
        //console.log('Files selected (currentFiles):', this.selectedFiles.length, this.selectedFiles);
      } else if (event.files && event.files.length > 0) {
        this.selectedFiles = Array.from(event.files);
        //console.log('Files selected (files):', this.selectedFiles.length, this.selectedFiles);
      } else {
        //console.log('No files in selection event');
        this.selectedFiles = [];
      }
    }
    
    override closeDialog(): void {
      this.inventoryItems = [];
      this.selectedFiles = [];
      this.form.reset();
      super.closeDialog();
    }

    onInventorySelectionChange(event: any) {
      const quantitiesGroup = this.form.get('inventoryQuantities') as FormGroup;
      Object.keys(quantitiesGroup.controls).forEach(key => {
          quantitiesGroup.removeControl(key);
      });

      event.value.forEach((itemUuid: string) => {
          quantitiesGroup.addControl(itemUuid, this.fb.control(0, [
              Validators.required,
              Validators.min(0),
              Validators.max(this.inventoryItems.find(i => i.itemUuid === itemUuid)?.quantityInStock || 0)
          ]));
      });
    }

    getQuantities(): {itemUuid: string, quantity: number}[] {
      const selectedItems = this.form.get('inventoryItemsUsed')?.value || [];
      const quantitiesGroup = this.form.get('inventoryQuantities') as FormGroup;
      
      return selectedItems.map((itemUuid: string) => ({
          itemUuid,
          quantity: quantitiesGroup.get(itemUuid)?.value || 0
      }));
    }

    onQuantitiesChanged(updatedInventory: Inventory[]) {
      const quantitiesGroup = this.form.get('inventoryQuantities') as FormGroup;

      updatedInventory.forEach(item => {
        if (quantitiesGroup.contains(item.itemUuid)) {
          quantitiesGroup.get(item.itemUuid)?.setValue(item.quantityInStock);
        }
      });
    }

    get inventoryItemsUsed(): Inventory[] {
      const selectedIds = this.form.get('inventoryItemsUsed')?.value || [];
      return this.inventoryItems.filter(item => selectedIds.includes(item.itemUuid));
    }
}