import { Component, inject, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { StorageService, VotingService } from 'shared';
import { HeaderComponent } from "src/app/components/header/header.component";
import { TabComponent } from 'src/app/components/tab/tab.component';
import { VoteComponent } from "./vote/vote.component";

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styles: ``,
  imports: [HeaderComponent, IonContent, TabComponent, VoteComponent],
})
export class VotingComponent  implements OnInit {

  private votingService = inject(VotingService);
  votingTasks = this.votingService.votingTasks;
  pendingTasks = this.votingService.pendingTasks;
  
  constructor(private storage: StorageService) { }

  async ngOnInit() {
    const id = await this.storage.get('trusteeId');
    await this.votingService.getTrusteeVotingTasks(id);
  }

}
