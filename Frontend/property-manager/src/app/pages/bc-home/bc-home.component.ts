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
    ReserveFundCardComponent, 
    MaintenanceGraphCardComponent, 
    DropdownModule, 
    CommonModule, 
    FormsModule, 
    Toast
  ],
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
export class BcHomeComponent implements OnInit {
  trusteeEmail: string = '';
  inviteMessage: string = '';
  bodyCorporateUuid: string = '';
  showInviteModal = false;

  constructor(
    public bodyCoporateService: BodyCoporateService, 
    private propertyService: PropertyService,
    private apiService: ApiService,
    private messageService: MessageService
  ) {}

  async ngOnInit() {
    const bcId = getCookieValue(document.cookie, 'bodyCoporateId');
    this.bodyCorporateUuid = bcId;

    try {
      await Promise.all([
        this.bodyCoporateService.loadFundContribution(bcId),
        this.bodyCoporateService.loadPendingTasks(bcId),
        this.bodyCoporateService.loadGraph(bcId)
      ]);
    } catch (error) {
      console.log("Error loading data:", error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Failed to load body corporate data. Please try again',
      });
    }
  }

  sendInviteToTrustee() {
    if (!this.trusteeEmail || !this.bodyCorporateUuid) {
      this.inviteMessage = 'Please enter a valid email address.';
      return;
    }

    // Basic UUID format validation
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(this.bodyCorporateUuid)) {
      this.inviteMessage = 'Invalid body corporate ID.';
      return;
    }

    this.apiService.getAllTrustees().subscribe({
      next: (trustees) => {
        const trustee = trustees.find(t => t.email.toLowerCase() === this.trusteeEmail.toLowerCase());
        if (!trustee) {
          this.inviteMessage = 'No trustee found with this email address.';
          return;
        }

        if (!uuidRegex.test(trustee.trusteeUuid)) {
          this.inviteMessage = 'Invalid trustee ID.';
          return;
        }

        const payload = {
          trusteeUuid: trustee.trusteeUuid,
          coporateUuid: this.bodyCorporateUuid,
          name: trustee.name || null,
          email: trustee.email || null,
          role: 'Trustee' // Match backend expectation
        };
        console.log('Sending invite with payload:', payload);

        this.propertyService.sendInvite(payload).subscribe({
          next: () => {
            this.inviteMessage = 'Invite sent successfully!';
            this.trusteeEmail = '';
          },
          error: (error) => {
            console.error('Invite error:', error);
            const errorMessage = error.status === 404 
              ? 'Trustee or body corporate not found.' 
              : error.status === 400 
                ? 'Invalid request. Please check the email and try again.'
                : 'Failed to send invite. Please try again later.';
            this.inviteMessage = error.error?.message || errorMessage;
          }
        });
      },
      error: () => {
        this.inviteMessage = 'Error fetching trustee details.';
      }
    });
  }
}