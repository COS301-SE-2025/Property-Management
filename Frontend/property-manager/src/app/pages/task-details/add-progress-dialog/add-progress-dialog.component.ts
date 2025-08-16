import { Component, DoCheck, Input, input } from "@angular/core";
import { DialogComponent } from "property-manager/src/app/components/dialog/dialog.component";
import { Toast } from "primeng/toast";
import { DialogModule } from "primeng/dialog";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import {  MultiSelectModule } from "primeng/multiselect";
import { getCookieValue, ImageApiService, Inventory, InventoryItemApiService, InventoryUsageApiService, Notification, NotificationsApiService, TaskApiService, TaskProgresApiService } from "shared";
import { InventoryCardComponent } from "../../view-house/inventory-card/inventory-card.component";
import { FileSelectEvent, FileUploadModule } from "primeng/fileupload";
import { MessageService } from "primeng/api";

@Component({
  selector: 'app-add-progress-dialog',
  templateUrl: './add-progress-dialog.component.html',
  styles: ``,
  imports: [Toast, DialogModule, ReactiveFormsModule, MultiSelectModule, InventoryCardComponent, CommonModule, FileUploadModule],
  providers: [MessageService, NotificationsApiService]
})
export class AddProgressDialogComponent extends DialogComponent implements DoCheck{
    
    form!: FormGroup;
    selectedFile: File | null = null;
    public taskId = input.required<string>();
    @Input() inventoryItemsAvailable! : Map<string, number>;
    public inventoryItems: Inventory[] = [];
    public addError = false;
    
    constructor(
      private fb: FormBuilder, 
      private inventoryItemService: InventoryItemApiService, 
      private imageService: ImageApiService, 
      private messageService: MessageService, 
      private notificationService: NotificationsApiService,
      private taskProgressService: TaskProgresApiService,
      private inventoryUsageService: InventoryUsageApiService,
      private taskService: TaskApiService 
    ){
      super();
      this.form = this.fb.group({
        description: ['', Validators.required],
        inventoryItemsUsed: [[]],
        inventoryQuantities: this.fb.group({}),
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
      if(this.form.valid)
      {
        this.addError = false;

        let imageId: string | undefined = "00000000-0000-0000-0000-000000000000";

        if(this.selectedFile)
        {
          try{
            const upload = await this.imageService.uploadImage(this.selectedFile).toPromise();
            if(upload?.imageId){
              imageId = upload?.imageId;
            }
          }
          catch(err)
          {
            console.error("Image upload failed", err);

            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to upload image, please try again'
            });
          }
        }

        const des = this.form.value.description
        const itemsUsed = this.getQuantities()[0];
        const progress = this.form.value.progress;
        const id = getCookieValue(document.cookie, 'contractorId');

        if(itemsUsed)
        {
          // TODO change so that contractor can select multiple items in usage
          this.taskProgressService.createProgress(id, this.taskId(), imageId, des, progress, itemsUsed.itemUuid, itemsUsed.quantity).subscribe({
            next: () => {
    
              this.taskService.getTaskById(this.taskId()).subscribe({
                next: (res) => {
                  
                  const noti: Notification = {
                    notificationType: "Task progress updated",
                    message: `Contractor has updated progress on ${res.title}`,
                    recipientType: 'trustee',
                    recipientUuid: res.tuuid,
                    isRead: false,
                    relatedTaskUuid: this.taskId()
                  }
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
                        detail: 'Task progress unsuccessfully added'
                      });
                    } 
                  })
                },
                error: () => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Task progress unsuccessfully added'
                  });
                }
              })
            }
          });
        }
        else
        {
          // TODO change so that contractor can select multiple items in usage
          this.taskProgressService.createProgress(id, this.taskId(), imageId, des, progress).subscribe({
            next: () => {
    
              this.taskService.getTaskById(this.taskId()).subscribe({
                next: (res) => {
                  
                  const noti: Notification = {
                    notificationType: "Task progress updated",
                    message: `Contractor has updated progress on ${res.title}`,
                    recipientType: 'trustee',
                    recipientUuid: res.tuuid,
                    isRead: false,
                    relatedTaskUuid: this.taskId()
                  }
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
                        detail: 'Task progress unsuccessfully added'
                      });
                    } 
                  })
                },
                error: () => {
                  this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Task progress unsuccessfully added'
                  });
                }
              })
            }
          });
        }
      }
    }
    onFileSelect(event: FileSelectEvent)
    {
    if(event.files && event.files.length > 0)
    {
      this.selectedFile = event.files[0];
    }
    }
    override closeDialog(): void {
      this.inventoryItems = [];
      this.form.get('inventoryItemsUsed')?.setValue([]);
      super.closeDialog();
    }
    onInventorySelectionChange(event: any) {
      // Clear previous quantities
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