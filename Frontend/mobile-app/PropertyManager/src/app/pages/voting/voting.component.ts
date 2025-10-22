import { Component, inject, OnInit } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { StorageService, VotingService } from 'shared';
import { HeaderComponent } from "src/app/components/header/header.component";
import { TabComponent } from 'src/app/components/tab/tab.component';
import { VoteComponent } from "./vote/vote.component";
import { CommonModule } from '@angular/common';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styles: ``,
  imports: [HeaderComponent, IonContent, TabComponent, VoteComponent, CommonModule, ProgressSpinnerModule],
})
export class VotingComponent implements OnInit {

  private votingService = inject(VotingService);
  votingTasks = this.votingService.votingTasks;
  pendingTasks = this.votingService.pendingTasks;
  loading = true;
  
  constructor(private storage: StorageService) { }

  async ngOnInit() {
    this.loading = true;
    const id = await this.storage.get('trusteeId');
    await this.votingService.getTrusteeVotingTasks(id);

    const start = Date.now();
    while(this.votingTasks().length === 0 && Date.now() - start < 3000)
    {
      await new Promise(res => setTimeout(res, 100));
    }

    await new Promise(res => setTimeout(res, 3000));
    this.loading = false;
  }
}
