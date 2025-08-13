import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HeaderComponent } from "../../components/header/header.component";
import { PendingTaskCardComponent } from "./pending-task-card/pending-task-card.component";
import { BodyCoporateService } from 'shared';
import { LifeCycleCardComponent } from "./life-cycle-card/life-cycle-card.component";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReserveFundCardComponent } from "./reserve-fund-card/reserve-fund-card.component";
import { MaintenanceGraphCardComponent } from './maintenanceGraph-card/maintenance-graph-card.component';
import { DropdownModule } from 'primeng/dropdown';
import { PropertyService } from 'shared';
import { ApiService } from 'shared';

@Component({
  selector: 'app-bc-home',
  imports: [
    HeaderComponent, 
    PendingTaskCardComponent, 
    LifeCycleCardComponent, 
    ReserveFundCardComponent, MaintenanceGraphCardComponent, DropdownModule, CommonModule, FormsModule],
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
  ){}

  async ngOnInit() {
    
    this.loadTrustees();

    this.bodyCorporateUuid = this.bodyCoporateService.bcId;

    while(!this.bodyCoporateService.bcId)
    {
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    try{
        await Promise.all([
          this.bodyCoporateService.loadFundContribution(),
          this.bodyCoporateService.loadPendingTasks(),
          this.bodyCoporateService.loadGraph()
        ]);
    }
    catch(error)
    {
      console.log("Error loading data:", error);
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
