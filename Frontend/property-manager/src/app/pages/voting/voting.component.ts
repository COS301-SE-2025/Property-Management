import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { VotingService } from 'shared';
import { VotingCardComponent } from "./voting-card/voting-card.component";

@Component({
  selector: 'app-voting',
  imports: [HeaderComponent, VotingCardComponent, CommonModule],
  templateUrl: './voting.component.html',
  styles: ``,
})
export class VotingComponent  implements OnInit {

  private votingService = inject(VotingService);
  tasks = this.votingService.votingTasks;
  
  constructor() { }
  
  async ngOnInit() {
    this.votingService.getTrusteeVotingTasks('test');
  }
}
