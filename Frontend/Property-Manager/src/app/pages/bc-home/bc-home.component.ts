import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HeaderComponent } from "../../components/header/header.component";
import { DrawerComponent } from '../../components/drawer/drawer.component';
import { PendingTaskCardComponent } from "./pending-task-card/pending-task-card.component";
import { BodyCoporateService } from '../../services/body-coporate.service';
import { LifeCycleCardComponent } from "./life-cycle-card/life-cycle-card.component";
import { ReserveFundCardComponent } from "./reserve-fund-card/reserve-fund-card.component";

@Component({
  selector: 'app-bc-home',
  imports: [HeaderComponent, DrawerComponent, PendingTaskCardComponent, LifeCycleCardComponent, ReserveFundCardComponent],
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

  constructor(public bodyCoporateService: BodyCoporateService){}

  async ngOnInit() {
      try{
        await Promise.all([
          this.bodyCoporateService.loadFundContribution(),
          this.bodyCoporateService.loadPendingTasks()
        ]);
      }
      catch(error)
      {
        console.log("Error loading data:", error);
      }
  }

}
