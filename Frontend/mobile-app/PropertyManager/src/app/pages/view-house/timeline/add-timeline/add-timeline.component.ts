import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonModal, IonInput, IonItem, IonToolbar, IonButtons, IonButton, IonContent, IonIcon, IonSelect, IonSelectOption, SelectChangeEventDetail } from "@ionic/angular/standalone";
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskApiService, ImageApiService, ContractorApiService, ContractorDetails, StorageService, Inventory, InventoryItemApiService, HousesService } from 'shared';
import { addIcons } from 'ionicons';
import { cameraOutline, trashOutline } from 'ionicons/icons';
import { PhotoService } from 'src/app/services/photo.service';
import { InventoryComponent } from '../../inventory/inventory.component';

@Component({
  selector: 'app-add-timeline',
  imports: [IonIcon, IonHeader, IonModal, IonInput, IonItem, IonIcon, IonToolbar, IonButtons, IonButton, IonContent, IonSelect, IonSelectOption, CommonModule, ReactiveFormsModule, InventoryComponent],
  templateUrl: './add-timeline.component.html',
  styles: ``,
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
    private housesService: HousesService
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
        }
      }

      const userId = await this.storage.get('trusteeId');

      const name = this.form.value.name;
      const des = this.form.value.description;
      const date = new Date(this.form.value.date);

      this.taskApiService.createTask(name, des, date, this.houseId, userId, imageId, userId, true, false).subscribe({
        next: (task) => {

          if(this.inventoryItemsUsed && this.inventoryItemsUsed.length > 0)
          {
            this.handleInventory(task.uuid);
          }

          this.form.reset();
          this.closeModal();

          setTimeout(() => {
            this.router.navigate(['view-house', this.houseId]).then(() => {
              window.location.reload();
            });
          }, 3000);
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
}
