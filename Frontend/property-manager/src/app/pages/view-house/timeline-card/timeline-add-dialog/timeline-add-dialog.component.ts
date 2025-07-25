import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { DatePickerModule } from 'primeng/datepicker';
import { SelectModule } from 'primeng/select';
import { ToastModule } from 'primeng/toast';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect'; 
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { HousesService, Inventory, InventoryItemApiService, TaskApiService } from 'shared';
import { getCookieValue } from 'shared';
import { ImageApiService } from 'shared';
import { ContractorApiService } from 'shared';
import { ContractorDetails } from 'shared';
import { InventoryCardComponent } from '../../inventory-card/inventory-card.component';

@Component({
  selector: 'app-timeline-add-dialog',
  imports: [ReactiveFormsModule, DialogModule, DatePickerModule, CommonModule, SelectModule, FileUploadModule, ToastModule, MultiSelectModule, TableModule, InventoryCardComponent],
  templateUrl: './timeline-add-dialog.component.html',
  styles: ``,
  providers: [MessageService]
})
export class TimelineAddDialogComponent extends DialogComponent implements OnInit{
 form!: FormGroup;
 houseId = '';
 selectedFile: File | null = null;

 public contractors: ContractorDetails[] | undefined = undefined;
 public inventoryItemsAvailable: Inventory[] | undefined = undefined;
 public inventoryItemsUsed: Inventory[] | undefined = undefined;
 public addError = false;

 @ViewChild(InventoryCardComponent) inventoryCard!: InventoryCardComponent;

 constructor(
  private fb: FormBuilder, 
  private route : ActivatedRoute, 
  private taskApiService: TaskApiService, 
  private imageService: ImageApiService, 
  private contractorService: ContractorApiService,
  private messageService: MessageService,
  private inventoryService: InventoryItemApiService,
  private housesService: HousesService
){
   super();
   this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }
 
 async ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      contractorName: ['', Validators.required],
    });

    //Get contractors
    this.contractorService.getAllContractors().subscribe({
      next: (response) => {
        this.contractors = response;
      }
    });

    //Get available inventory items
    this.inventoryService.getInventoryItemsByBuilding(this.houseId).subscribe({
      next: (res) => {
        this.inventoryItemsAvailable = res;
      }
    });
 }

 override closeDialog(): void{
  super.closeDialog();
  this.form.reset();
  // this.contractors = [];
 }
 onFileSelect(event: FileSelectEvent)
 {
  if(event.files && event.files.length > 0)
  {
    this.selectedFile = event.files[0];
  }
 }
 async onSubmit() {
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

    const userId = getCookieValue(document.cookie, 'trusteeId');
    const name = this.form.value.name;
    const des = this.form.value.description;
    const date = this.form.value.date;

    console.log(this.form.value.contractorName);

    const contractorId = this.form.value.contractorName;

    this.taskApiService.createTask(name, des, "pending", date, false, this.houseId, userId, imageId, contractorId).subscribe({
      next: (task) => {

        if(this.inventoryItemsUsed && this.inventoryItemsUsed.length > 0)
        {
          console.log("handling inventory usage", task.uuid);
          this.handleInventoryUsage(task.uuid);
        }

        this.form.reset();
        this.closeDialog();

        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Task added successfully'
        });

        // setTimeout(() => {
        //   this.router.navigate(['viewHouse', this.houseId]).then(() => {
        //     window.location.reload();
        //   });
        // }, 3000);
      },
      error: (err) => {
        console.error("Failed to create task", err);
        this.addError = true;
      }
    });
  }
 }
 updateInventoryItemsUsed(event: MultiSelectChangeEvent)
 {
  const selectedIds = event.value as string[];
  if(!this.inventoryItemsAvailable) return;

  this.inventoryItemsUsed = this.inventoryItemsAvailable.filter(item =>
    selectedIds.includes(item.itemUuid)).map(item => ({...item})
  );
 }
 private handleInventoryUsage(taskId: string)
 {
  if(!this.inventoryItemsUsed) return;

  
  this.inventoryItemsUsed.forEach(item => {
    console.log(item.quantityInStock);
    console.log(taskId)
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
