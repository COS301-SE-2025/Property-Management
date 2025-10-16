import { Component, DoCheck, Input, input } from '@angular/core';
import { IonHeader, IonContent, IonToolbar, IonIcon, IonButton, IonButtons, IonModal, ToastController } from "@ionic/angular/standalone";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { addIcons } from 'ionicons';
import { CommonModule } from '@angular/common';
import { PhotoService } from 'src/app/services/photo.service';
import { FileSelectEvent } from "primeng/fileupload";
import { MultiSelectModule } from "primeng/multiselect";
import { cameraOutline, trashOutline } from 'ionicons/icons';
import { FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { ImageApiService, Notification,  Inventory, InventoryItemApiService, InventoryUsageApiService, NotificationsApiService, StorageService, TaskApiService, TaskProgresApiService } from 'shared';

@Component({
  selector: 'app-progress-dialog',
  templateUrl: './progress-dialog.component.html',
  styles: ``,
  imports: [IonHeader, MultiSelectModule, IonIcon, IonContent, IonToolbar, IonButton, IonButtons, IonModal, ReactiveFormsModule, CommonModule],
})
export class ProgressDialogComponent extends ModalComponent implements DoCheck {

  form!: FormGroup;
  selectedFile: File | null = null;
  public taskId = input.required<string>();
  @Input() inventoryItemsAvailable! : Map<string, number>;
  public inventoryItems: Inventory[] = [];
  public addError = false;
  public capturedPhoto: string | null = null;
  
  constructor(
    private fb: FormBuilder, 
    private inventoryItemService: InventoryItemApiService, 
    private imageService: ImageApiService, 
    private notificationService: NotificationsApiService,
    private taskProgressService: TaskProgresApiService,
    private inventoryUsageService: InventoryUsageApiService,
    private taskService: TaskApiService,
    private storageService: StorageService,
    private photoService: PhotoService,
    private toastController: ToastController 
  ) { 
    super();
    this.form = this.fb.group({
      description: ['', Validators.required],
      inventoryItemsUsed: [[]],
      inventoryQuantities: this.fb.group({}),
      progress: ['', [Validators.required, Validators.min(0), Validators.max(100)]]
    });

    addIcons({ cameraOutline, trashOutline });
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
  override async confirm()
  {
    if(this.form.valid)
    {
      this.addError = false;

      let imageId: string | undefined = "00000000-0000-0000-0000-000000000000";

      if(this.selectedFile)
      {
        try{
          const upload = await this.imageService.uploadImages(this.selectedFile, ).toPromise();
          if(upload?.imageId){
            imageId = upload?.imageId;
          }
        }
        catch(err)
        {
          console.error("Image upload failed", err);
          await this.presentToast('Failed to upload image, please try again', "warning");
        }
      }

      const des = this.form.value.description
      const itemsUsed = this.getQuantities()[0];
      const progress = this.form.value.progress;
      const id = await this.storageService.get('contractorId');

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
                  next: async () => {
                    await this.presentToast('Task progress successfully added', "success")
  
                    this.closeModal();
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  },
                  error: async() => {
                    await this.presentToast('Task progress unsuccessfully recorded', "danger");
                  } 
                })
              },
              error: async() => {
                await this.presentToast('Task progress unsuccessfully recorded', "danger");
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
                  next: async() => {
                    await this.presentToast('Task progress succesfully recorded', "success")
  
                    this.closeModal();
                    setTimeout(() => {
                      window.location.reload();
                    }, 2000);
                  },
                  error: async() => {
                    await this.presentToast('Task progress unsuccessfully recorded', "danger");
                  } 
                })
              },
              error: async () => {
                await this.presentToast('Task progress unsuccessfully recorded', "danger");
              }
            })
          }
        });
      }
    }
  }
  override closeModal(): void {
    this.inventoryItems = [];
    this.form.get('inventoryItemsUsed')?.setValue([]);
    super.closeModal();
  }
  onFileSelect(event: FileSelectEvent)
  {
    if(event.files && event.files.length > 0)
    {
      this.selectedFile = event.files[0];
    }
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
    async capturePhoto(){
      try{
        const photo = await this.photoService.takePhoto();
        if(photo.base64String)
        {
          this.capturedPhoto = `data:image/${photo.format};base64,${photo.base64String}`;

          const blob = this.photoService.base64ToBlob(photo.base64String, `image/$(photo.format)`);
          this.selectedFile = this.photoService.createFile(blob, `captured_${Date.now()}.${photo.format}`, photo.format);
        }
      }
      catch(err){
        console.error("Error capturing photo", err);
      }
  }
  deletePhoto()
  {
    this.capturedPhoto = null;
    this.selectedFile = null;
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
