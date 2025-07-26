import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { getCookieValue, VotingService } from 'shared';
import { VotingCardComponent } from "./voting-card/voting-card.component";

@Component({
  selector: 'app-voting',
  imports: [HeaderComponent, VotingCardComponent, CommonModule],
  templateUrl: './voting.component.html',
  styles: ``,
})
export class VotingComponent  implements OnInit {

  private votingService = inject(VotingService);
  votingTasks = this.votingService.votingTasks;
  pendingTasks = this.votingService.pendingTasks;

  bcUser = false;
  
  constructor() { 
    if(getCookieValue(document.cookie, 'bodyCoporateId') !== '')
    {
      this.bcUser = true;
    }
  }
  
  async ngOnInit() {
    await this.votingService.getTrusteeVotingTasks('test');
  }
}
