import { Component, inject, input } from '@angular/core';
import { Anomaly, BodyCoporateService, BuildingApiService, getCookieValue, InventoryItemApiService, Notification, NotificationsApiService, PropertyService, FormatAmountPipe, BudgetApiService, BuildingDetails } from 'shared';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { ToastModule } from "primeng/toast";

@Component({
  selector: 'app-inventory-anomaly-card',
  imports: [CommonModule, ToastModule, FormatAmountPipe],
  templateUrl: './inventory-anomaly-card.component.html',
  styles: ``,
})
export class InventoryAnomalyCardComponent{

  bodyCorporateService = inject(BodyCoporateService);
  anomalies = input.required<Anomaly[]>();

  constructor(
    private inventoryService: InventoryItemApiService, 
    private inviteService: PropertyService, 
    private notificationService: NotificationsApiService, 
    private messageService: MessageService,
    private buildingService: BuildingApiService,
    private budgetApiService: BudgetApiService
  ){}

  approveAnomaly(item: Anomaly)
  {
    //Change unit name
    this.inventoryService.updateInventoryItemUnit(item.itemUuid, "NORMAL").subscribe({
      next: async() => {
        const bcId = getCookieValue(document.cookie, 'bodyCorporateId');
        this.bodyCorporateService.loadAnomalies(bcId);

        //Update budget
        await this.getAndUpdateBudget(item.price*item.quantityInStock, item.buildingUuidFk!)

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Approved suspicions inventory item',
        });

        const noti: Notification = {
          notificationType: 'Inventory item approved',
          message: `Your inventory item: ${item.name} has been approved`,
          recipientType: 'trustee',
          recipientUuid: item.trusteeUuid,
          isRead: false
        };
        this.notificationService.createNotifications(noti).subscribe();
      },
      error: (err) => {
        console.error("Error updating inventory item", err);
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error approving inventory item',
        });
      }
    })
  }
  disapproveAnomaly(item: Anomaly)
  {
    //Delete inventory item
    this.inventoryService.deleteInventoryItem(item.itemUuid).subscribe({
      next: () => {
        const bcId = getCookieValue(document.cookie, 'bodyCorporateId');
        this.bodyCorporateService.loadAnomalies(bcId);

        this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Rejected suspicions inventory item',
        });

        const noti: Notification = {
          notificationType: 'Inventory item rejected',
          message: `Your inventory item: ${item.name} has been rejected`,
          recipientType: 'trustee',
          recipientUuid: item.trusteeUuid,
          isRead: false
        };
        this.notificationService.createNotifications(noti).subscribe();
      },
      error: (err) => {
        console.error("Error updating inventory item", err);
        this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error approving inventory item',
        });
      }
    })
  }
  revokeUser(item: Anomaly)
  {
    //delete user
    const bcId = getCookieValue(document.cookie, 'bodyCorporateId');
    this.inviteService.getTrusteesInBodyCorporate(bcId).subscribe({
      next: (res) => {
        const filtered = res.filter(i => i.trusteeUuid === item.trusteeUuid)[0];

        this.inviteService.updateInviteStatus(filtered.inviteUuid, 'REJECTED').subscribe({
          next: () =>{
            const noti: Notification = {
              notificationType: 'INVITE REVOKED',
              message: `Your membership in the body corporate has been revoked.`,
              recipientType: 'trustee',
              recipientUuid: item.trusteeUuid,
              isRead: false,
              relatedInviteUuid: filtered.inviteUuid
            };
            this.notificationService.createNotifications(noti).subscribe();

            // remove bc id from trustees buildings
            this.buildingService.getBuildingsByTrustee(item.trusteeUuid).subscribe({
              next: (res) => {
                res.buildings.forEach(b => {
                  this.buildingService.removeBuildingFromBc(b.buildingUuid!).subscribe();
                })
              }
            })
            
            this.bodyCorporateService.loadAnomalies(bcId);
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Removed user from body corporate',
            });
          },
          error: (err) => {
             console.error("Error updating inventory item", err);
              this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Error approving inventory item',
            });
          }
        })
      }
    })
  }
  private async getAndUpdateBudget(overallPrice: number, buildingId: string) {
    const targetBuildingId = buildingId;

    if (!targetBuildingId) {
      console.error("No building ID available for budget update");
      return;
    }

    this.budgetApiService.getBudgetsByBuildingId(targetBuildingId).subscribe(
      (bulidingDetails: BuildingDetails[]) => {
        const element = bulidingDetails[bulidingDetails.length - 1];
        const elementID = element.budgetUuid;

        console.log(element);

        const newBudget: BuildingDetails = {
          budgetUuid: elementID,
          buildingUuid: targetBuildingId,
          approvalDate: new Date(),
          inventoryBudget: (element.inventoryBudget - overallPrice),
          inventorySpent: overallPrice,
          maintenanceBudget: element.maintenanceBudget,
          maintenanceSpent: element.maintenanceSpent
        };
        console.log(newBudget);
        this.budgetApiService.updateBudget(elementID, newBudget).subscribe({
          error: (err) => {
            console.error("Couldnt update budget", err);
          }
        });
      }
    );
  }
}
