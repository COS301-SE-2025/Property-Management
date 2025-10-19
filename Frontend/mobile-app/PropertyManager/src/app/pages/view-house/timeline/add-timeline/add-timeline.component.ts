import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonModal, IonInput, IonItem, IonToolbar, IonButtons, IonButton, IonContent, IonIcon, IonSelect, IonSelectOption, SelectChangeEventDetail } from "@ionic/angular/standalone";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePickerModule } from 'primeng/datepicker';
import { TaskApiService, Notification, NotificationsApiService, ImageApiService, ContractorApiService, ContractorDetails, StorageService, Inventory, InventoryItemApiService, HousesService } from 'shared';
import { addIcons } from 'ionicons';
import { cameraOutline, trashOutline } from 'ionicons/icons';
import { PhotoService } from 'src/app/services/photo.service';
import { SelectModule } from 'primeng/select';
import { ToastController } from '@ionic/angular/standalone';
import { InventoryComponent } from '../../inventory/inventory.component';
import { firstValueFrom, Observable } from 'rxjs';

@Component({
  selector: 'app-add-timeline',
  imports: [IonIcon, IonHeader, IonModal, IonInput, IonItem, IonIcon, IonToolbar, IonButtons, IonButton, IonContent, IonSelect, IonSelectOption, CommonModule, ReactiveFormsModule, InventoryComponent, DatePickerModule, SelectModule],
  templateUrl: './add-timeline.component.html',
  styles: `
    :host ::ng-deep .low-priority {
      color: #4CAF50;
    }
    :host ::ng-deep .medium-priority {
      color: #FFC107;
    }
    :host ::ng-deep .high-priority {
      color: #F44336;
    }
  `,
})
export class AddTimelineComponent extends ModalComponent implements OnInit {

  form!: FormGroup;
  houseId = '';
  selectedFiles: File[] = [];
  loading = false;
  
  public capturedPhotos: string[] = [];
  public contractors: ContractorDetails[] | undefined = undefined;
  public inventoryItemsAvailable: Inventory[] | undefined = undefined;
  public inventoryItemsUsed: Inventory[] | undefined  = undefined;
  public addError = false;

   public priorities = [
    { label: 'Low', value: 'Low', styleClass: 'low-priority'},
    { label: 'Medium', value: 'Medium', styleClass: 'medium-priority' },
    { label: 'High', value: 'High', styleClass: 'high-priority' }
  ];

  @ViewChild(InventoryComponent) inventoryCard!: InventoryComponent;

  constructor(
    private fb: FormBuilder, 
    private route : ActivatedRoute, 
    private router: Router, 
    private taskApiService: TaskApiService, 
    private imageService: ImageApiService, 
    private contractorService: ContractorApiService,
    private storage: StorageService,
    private photoService: PhotoService,
    private inventoryService: InventoryItemApiService,
    private housesService: HousesService,
    private notificationService: NotificationsApiService,
    private toastController: ToastController
  ) {
    super();

    addIcons({ cameraOutline, trashOutline });
  }

  async ngOnInit() {
    this.loading = false;
    this.route.params.subscribe(params => {
      this.houseId = params['houseId'] || null;
    });

    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      priority: ['', Validators.required]
    });

    this.contractorService.getAllContractors().subscribe({
      next: (response) => {
        this.contractors = response;
      }
    });

    this.inventoryService.getInventoryItemsByBuilding(this.houseId).subscribe({
      next: (res) => {
        this.inventoryItemsAvailable = res;
      }
    });
  }

  override closeModal(): void {
    this.form.reset();
    this.inventoryItemsUsed = undefined;
    this.selectedFiles = [];
    this.capturedPhotos = [];
    super.closeModal();
  }

  async capturePhoto() {
    try {
      const photo = await this.photoService.takePhoto();
      if (photo.base64String) {
        const photoUrl = `data:image/${photo.format};base64,${photo.base64String}`;
        this.capturedPhotos.push(photoUrl);

        const blob = this.photoService.base64ToBlob(photo.base64String, `image/${photo.format}`);
        const file = this.photoService.createFile(blob, `task_${Date.now()}.${photo.format}`, photo.format);
        this.selectedFiles.push(file);

        //console.log(`Photo ${this.capturedPhotos.length} captured`);
      }
    } catch (err) {
      console.error("Error capturing photo", err);
      await this.presentToast('Failed to capture photo', 'danger');
    }
  }

  // In add-timeline.component.ts - Update the confirm() method

override async confirm() {
  if (this.form.valid) {
    this.loading = true;
    this.addError = false;

    try {
      const userId = await this.storage.get('trusteeId');
      const name = this.form.value.name;
      const des = this.form.value.description;
      const date = new Date(this.form.value.date);
      const priority = this.form.value.priority.value;

      // STEP 1: Upload ALL images WITHOUT task UUID (initially)
      let uploadedImageIds: string[] = [];
      let primaryImageId: string = "00000000-0000-0000-0000-000000000000";

      if (this.selectedFiles.length > 0) {
        try {
          //console.log(`Uploading ${this.selectedFiles.length} task images without task UUID...`);

          uploadedImageIds = await this.imageService.uploadImages(
            this.selectedFiles,   // Array of files
            undefined,            // user_uuid
            undefined,            // task_uuid - NOT YET AVAILABLE
            undefined,            // progress_uuid
            undefined             // building_uuid
          );

          if (uploadedImageIds && uploadedImageIds.length > 0) {
            primaryImageId = uploadedImageIds[0];
            //console.log(`${uploadedImageIds.length} images uploaded successfully`);
            //console.log('Primary image ID:', primaryImageId);
          }
        } catch (uploadError) {
          console.error('Error uploading images:', uploadError);
          await this.presentToast('Failed to upload images', 'danger');
          this.loading = false;
          return;
        }
      }

      // STEP 2: Create task with primary image ID
      //console.log('Creating task with primary image ID:', primaryImageId);

      this.taskApiService.createTask(
        name, 
        des, 
        date, 
        this.houseId, 
        userId, 
        primaryImageId, 
        userId, 
        true, 
        false, 
        priority
      ).subscribe({
        next: async (task) => {
          //console.log('Task created:', task);
          const taskUuid = task.uuid;

          // STEP 3: Update ALL image associations with task UUID (if images were uploaded)
          if (uploadedImageIds.length > 0) {
            try {
              //console.log(`Updating ${uploadedImageIds.length} image associations with task UUID:`, taskUuid);

              // Process all image updates sequentially to avoid race conditions
              for (let i = 0; i < uploadedImageIds.length; i++) {
                const imageId = uploadedImageIds[i];
                //console.log(`[${i + 1}/${uploadedImageIds.length}] Updating image ${imageId}`);
                
                try {
                  await this.imageService.updateImageAssociations(
                    imageId,
                    undefined,      // user_uuid
                    taskUuid,       // task_uuid - NOW AVAILABLE!
                    undefined,      // progress_uuid
                    undefined       // building_uuid
                  );
                  //console.log(`✓ Image ${i + 1} updated successfully`);
                } catch (imageError) {
                  console.error(`Failed to update image ${imageId}:`, imageError);
                  // Continue with other images even if one fails
                }
              }

              //console.log(`✓ All ${uploadedImageIds.length} images processed`);
            } catch (updateError) {
              console.error('Failed to update some image associations:', updateError);
              // Non-critical error - task is already created
            }
          }

          // Handle inventory
          if (this.inventoryItemsUsed && this.inventoryItemsUsed.length > 0) {
            this.handleInventory(taskUuid);
          }

          this.loading = false;
          this.form.reset();
          this.closeModal();

          const house = this.housesService.getHouseById(this.houseId);

          if (house?.coporateUuid) {
            const noti: Notification = {
              notificationType: 'Task Creation',
              message: `New task: ${name} has been added to ${house?.name}`,
              recipientUuid: house?.coporateUuid!,
              recipientType: 'body corporate',
              isRead: false,
              relatedTaskUuid: taskUuid
            };

            this.notificationService.createNotifications(noti).subscribe({
              next: async () => {
                await this.presentToast('Task successfully added', "success");

                setTimeout(() => {
                  this.router.navigate(['view-house', this.houseId]).then(() => {
                    window.location.reload();
                  });
                }, 1500);
              },
              error: async (err) => {
                console.error("Failed to create notification", err);
                this.loading = false;
                await this.presentToast('Task created but notification failed', 'warning');
              }
            });
          } else {
            await this.presentToast('Task successfully added', "success");

            setTimeout(() => {
              this.router.navigate(['view-house', this.houseId]).then(() => {
                window.location.reload();
              });
            }, 1500);
          }
        },
        error: async (err) => {
          console.error("Failed to create task", err);
          this.loading = false;
          this.addError = true;
          await this.presentToast('Failed to create task', 'danger');
        }
      });
    } catch (err) {
      console.error("Unexpected error:", err);
      this.loading = false;
      this.addError = true;
      await this.presentToast('An unexpected error occurred', 'danger');
    }
  } else {
    await this.presentToast('Please fill all required fields', 'warning');
  }
}

  deletePhoto(index: number) {
    this.capturedPhotos.splice(index, 1);
    this.selectedFiles.splice(index, 1);
    //console.log(`Photo ${index + 1} deleted. Remaining: ${this.capturedPhotos.length}`);
  }

  updateInventoryItemsUsed(event: CustomEvent<SelectChangeEventDetail<string[]>>) {
    const selectedIds = event.detail.value as string[];
    if (!this.inventoryItemsAvailable) return;

    this.inventoryItemsUsed = this.inventoryItemsAvailable.filter(item =>
      selectedIds.includes(item.itemUuid)
    );
  }

  private handleInventory(taskId: string) {
    if (!this.inventoryItemsUsed) return;

    this.inventoryItemsUsed.forEach(item => {
      this.inventoryCard.addItemToUsage(
        taskId,
        item.itemUuid,
        item.quantityInStock
      );

      const org = this.inventoryItemsAvailable?.find(i => i.itemUuid === item.itemUuid);
      if (org) {
        org.quantityInStock -= item.quantityInStock;
        if (org.quantityInStock <= 0) {
          this.inventoryItemsAvailable = this.inventoryItemsAvailable?.filter(i => i.itemUuid != item.itemUuid);
          this.housesService.deleteInvetoryItem(item);
        } else {
          this.housesService.updateInventory([org]);
        }
      }
    });
  }

  onQuantitiesChanged(updated: Inventory[]) {
    this.inventoryItemsUsed = updated;
  }

  private async presentToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,      
      position: 'top'
    });
    await toast.present();
  }
}