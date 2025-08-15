import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HeaderComponent } from "../../components/header/header.component";
import { PendingTaskCardComponent } from "./pending-task-card/pending-task-card.component";
import { BodyCoporateService, getCookieValue } from 'shared';
import { LifeCycleCardComponent } from "./life-cycle-card/life-cycle-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReserveFundCardComponent } from "./reserve-fund-card/reserve-fund-card.component";
import { MaintenanceGraphCardComponent } from './maintenanceGraph-card/maintenance-graph-card.component';
import { DropdownModule } from 'primeng/dropdown';
import { PropertyService } from 'shared';
import { ApiService } from 'shared';
import { MessageService } from 'primeng/api';
import { Toast } from "primeng/toast";

@Component({
  selector: 'app-bc-home',
  imports: [
    HeaderComponent, 
    PendingTaskCardComponent, 
    LifeCycleCardComponent, 
    ReserveFundCardComponent, MaintenanceGraphCardComponent, DropdownModule, CommonModule, FormsModule, Toast],
  providers: [MessageService],
  templateUrl: './bc-home.component.html',
  styles: ``,
  animations: [
    trigger('floatUp', [
      state('void', style({
        transform: 'translateY(20%)',
        opacity: 0
      })),
      transition(':enter', [
        animate('600ms ease-out', style({
          transform: 'translateY(0)',
          opacity: 1
        }))
      ])
    ])
  ]
})
export class BcHomeComponent implements OnInit{

  trusteeOptions: { name: string; uuid: string }[] = [];
  selectedTrusteeUuid: string | null = null;
  inviteMessage: string = '';
  bodyCorporateUuid: string = '';

  showInviteModal = false;

  constructor(
    public bodyCoporateService: BodyCoporateService, 
    private propertyService: PropertyService,
    private apiService: ApiService
  , private messageService: MessageService){}

  async ngOnInit() {
    
    this.loadTrustees();

    
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.bodyCorporateUuid = bcId;

    try{
        await Promise.all([
          this.bodyCoporateService.loadFundContribution(bcId),
          this.bodyCoporateService.loadPendingTasks(bcId),
          this.bodyCoporateService.loadGraph(bcId)
        ]);
    }
    catch(error)
    {
      console.log("Error loading data:", error);
      
      this.messageService.add({
         severity: 'error',
          summary: 'Error',
          detail: 'Failed to load body corporate data. Please try again',
      })

    }
  }

  loadTrustees() {
    this.apiService.getAllTrustees().subscribe(trustees => {
      this.trusteeOptions = trustees.map(t => ({
        name: t.name,
        uuid: t.trusteeUuid
      }));
    });
  }

  sendInviteToTrustee() {
    if (!this.selectedTrusteeUuid || !this.bodyCorporateUuid) return;
    this.propertyService.sendInvite({
      trusteeUuid: this.selectedTrusteeUuid,
      coporateUuid: this.bodyCorporateUuid
    }).subscribe({
      next: () => {
        this.inviteMessage = 'Invite sent successfully!';
      },
      error: () => {
        this.inviteMessage = 'Failed to send invite.';
      }
    });
  }
}
