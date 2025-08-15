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
  selectedFile: File | null = null;
  
  public capturedPhoto: string | null = null;
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
    super.closeModal();
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
  override async confirm() {
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

          await this.presentToast('Failed to upload image, please try again', "warning");
        }
      }

      const userId = await this.storage.get('trusteeId');

      const name = this.form.value.name;
      const des = this.form.value.description;
      const date = new Date(this.form.value.date);
      const proirity = this.form.value.priority;

      this.taskApiService.createTask(name, des, date, this.houseId, userId, imageId, userId, true, false, proirity).subscribe({
        next: (task) => {

          if(this.inventoryItemsUsed && this.inventoryItemsUsed.length > 0)
          {
            this.handleInventory(task.uuid);
          }

          this.form.reset();
          this.closeModal();

          const house = this.housesService.getHouseById(this.houseId);

          const noti: Notification = {
            notificationType: 'Task Creation',
            message: `New task: ${name} has been added to ${house?.name}`,
            recipientUuid: house?.coporateUuid!,
            recipientType: 'body corporate',
            isRead: false,
            relatedTaskUuid: task.uuid
          }

          this.notificationService.createNotifications(noti).subscribe({
            next: async() => {

              await this.presentToast('Task successfully added', "success");

              setTimeout(() => {
                this.router.navigate(['view-house', this.houseId]).then(() => {
                  window.location.reload();
                });
              }, 2000);
            },
            error: (err) => {
              console.error("Failed to create task", err);
              this.addError = true;
            }
          })
        },
        error: (err) => {
          console.error("Failed to create task", err);
          this.addError = true;
        }
      });
    }
  }
  deletePhoto()
  {
    this.capturedPhoto = null;
    this.selectedFile = null;
  }
  updateInventoryItemsUsed(event: CustomEvent<SelectChangeEventDetail<string[]>>)
  {
    const selectedIds = event.detail.value as string[];
    if(!this.inventoryItemsAvailable) return;

    this.inventoryItemsUsed = this.inventoryItemsAvailable.filter(item =>
      selectedIds.includes(item.itemUuid)
    );
 }
 private handleInventory(taskId: string)
 {
  if(!this.inventoryItemsUsed) return;

  this.inventoryItemsUsed.forEach(item => {
    this.inventoryCard.addItemToUsage(
      taskId,
      item.itemUuid,
      item.quantityInStock
    );

    const org = this.inventoryItemsAvailable?.find(i => i.itemUuid === item.itemUuid);
    if(org)
    {
      org.quantityInStock -= item.quantityInStock;
      if(org.quantityInStock <= 0)
      {
        this.inventoryItemsAvailable = this.inventoryItemsAvailable?.filter(i => i.itemUuid != item.itemUuid);

        this.housesService.deleteInvetoryItem(item);
      }
      else
      {
        this.housesService.updateInventory([org]);
      }
    }
  });
 }
 onQuantitiesChanged(updated: Inventory[])
 {
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
