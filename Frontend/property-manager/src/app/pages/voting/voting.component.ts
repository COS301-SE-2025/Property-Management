import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { getCookieValue, VotingService } from 'shared';
import { VotingCardComponent } from "./voting-card/voting-card.component";
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-voting',
  imports: [HeaderComponent, VotingCardComponent, CommonModule],
  templateUrl: './voting.component.html',
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
export class VotingComponent  implements OnInit {

  private votingService = inject(VotingService);
  votingTasks = this.votingService.votingTasks;
  pendingTasks = this.votingService.pendingTasks;
  finalApproval = this.votingService.finalApproval;
  approvedTasks = this.votingService.approvedTasks;

  bcUser = false;
  
  constructor() { 
    if(getCookieValue(document.cookie, 'bodyCoporateId') !== '')
    {
      this.bcUser = true;
    }
  }
  
  async ngOnInit() {

    if(!this.bcUser)
    {
      const trusteeId = getCookieValue(document.cookie, 'trusteeId');
      await this.votingService.getTrusteeVotingTasks(trusteeId);
    }
    else
    {
      await this.votingService.getBodyCorporateVotingTasks();
    }
  }
}
