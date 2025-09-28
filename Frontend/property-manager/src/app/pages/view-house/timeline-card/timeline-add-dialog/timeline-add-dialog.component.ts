import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { CheckboxModule } from 'primeng/checkbox';
import { DatePickerModule } from 'primeng/datepicker';
import { ToastModule } from 'primeng/toast';
import { SelectModule } from 'primeng/select';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect'; 
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { FileUploadModule, FileSelectEvent } from 'primeng/fileupload';
import { DialogComponent } from '../../../../components/dialog/dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { HousesService, Inventory, InventoryItemApiService, Notification, NotificationsApiService, TaskApiService } from 'shared';
import { getCookieValue } from 'shared';
import { ImageApiService } from 'shared';
import { ContractorApiService } from 'shared';
import { ContractorDetails } from 'shared';
import { InventoryCardComponent } from '../../inventory-card/inventory-card.component';

@Component({
  selector: 'app-timeline-add-dialog',
  imports: [ReactiveFormsModule, DialogModule, DatePickerModule, CommonModule, FileUploadModule, ToastModule, MultiSelectModule, TableModule, InventoryCardComponent, SelectModule, CheckboxModule],
  templateUrl: './timeline-add-dialog.component.html',
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

 public priorities = [
  { label: 'Low', value: 'Low', styleClass: 'low-priority'},
  { label: 'Medium', value: 'Medium', styleClass: 'medium-priority' },
  { label: 'High', value: 'High', styleClass: 'high-priority' }
 ];

 @ViewChild(InventoryCardComponent) inventoryCard!: InventoryCardComponent;

 constructor(
  private fb: FormBuilder, 
  private route : ActivatedRoute, 
  private router: Router,
  private taskApiService: TaskApiService, 
  private imageService: ImageApiService, 
  private contractorService: ContractorApiService,
  private messageService: MessageService,
  private inventoryService: InventoryItemApiService,
  private housesService: HousesService,
  private notificationService: NotificationsApiService
){
   super();
   this.houseId = String(this.route.snapshot.paramMap.get('houseId'));
  }
 
 async ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      priority: ['', Validators.required],
      allowContractor: [false]
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
  this.selectedFile = null;
  this.inventoryItemsUsed = undefined;
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
  if (this.form.valid) {
    this.addError = false;

    let imageId: string | undefined = "00000000-0000-0000-0000-000000000000";

    if (this.selectedFile) {
      try {
        const upload = await this.imageService.uploadImage(this.selectedFile).toPromise();
        if (upload?.imageId) {
          imageId = upload.imageId;
        }
      } catch (err) {
        console.error("Image upload failed", err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to upload image, please try again'
        });
      }
    }

    const userId = getCookieValue(document.cookie, 'trusteeId');
    const isBodyCorporate = userId === '' ? true : false;
    const name = this.form.value.name;
    const des = this.form.value.description;
    const date = this.form.value.date;
    const proirity = this.form.value.priority.value;
    const allowContractor = this.form.value.allowContractor;

    this.taskApiService.createTask(name, des, date, this.houseId, userId, imageId, userId, !isBodyCorporate, isBodyCorporate, proirity).subscribe({
      next: (task) => {
        if (allowContractor) {
          this.taskApiService.updateTaskAllowContractor(task.uuid).subscribe({
            next: () => {
              console.log('Task status updated to allow');
            },
            error: (err) => {
              console.error('Failed to update task status to allow', err);
            }
          });
        }

        if (this.inventoryItemsUsed && this.inventoryItemsUsed.length > 0) {
          this.handleInventoryUsage(task.uuid);
        }

        this.form.reset();
        this.closeDialog();

        const house = this.housesService.getHouseById(this.houseId);

        const buildingId = String(this.route.snapshot.paramMap.get('houseId'));

        if (house?.coporateUuid) {
          const noti: Notification = {
            notificationType: 'Task Creation',
            message: `New task: ${name} has been added to ${house.name}`,
            recipientUuid: house.coporateUuid!,
            recipientType: 'bodycoporate',
            isRead: false,
            relatedTaskUuid: task.uuid
          };
          this.notificationService.createNotifications(noti).subscribe({
            next: () => {
              this.messageService.add({
                severity: 'success',
                summary: 'Success',
                detail: 'Task added successfully'
              });
              this.housesService.loadTasks(buildingId);
            }
          });
        } else {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Task added successfully'
          });
          this.housesService.loadTasks(buildingId);
        }
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
    this.inventoryCard.addItemToUsage(
      taskId,
      item.itemUuid,
      item.quantityInStock,
      true
    );

    // const org = this.inventoryItemsAvailable?.find(i => i.itemUuid === item.itemUuid);
    // if(org)
    // {
    //   org.quantityInStock -= item.quantityInStock;
    //   if(org.quantityInStock <= 0)
    //   {
    //     this.inventoryItemsAvailable = this.inventoryItemsAvailable?.filter(i => i.itemUuid != item.itemUuid);

    //     this.housesService.deleteInvetoryItem(item);
    //   }
    //   else
    //   {
    //     this.housesService.updateInventory([org]);
    //   }
    // }
  });
 }
 onQuantitiesChanged(updated: Inventory[])
 {
  this.inventoryItemsUsed = updated;
 }
}
