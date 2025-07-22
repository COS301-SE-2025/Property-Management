import { Component, inject, input, OnDestroy, OnInit } from '@angular/core';
import { IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { BuildingDetails, HousesService, FormatAmountPipe } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CreateBudgetComponent } from './create-budget/create-budget.component';

@Component({
  selector: 'app-budget',
  imports: [IonCardContent, IonCardHeader, IonCard, CommonModule, IonCard, IonCardContent, IonCardHeader, IonCardTitle, FormatAmountPipe, IonCardSubtitle, CreateBudgetComponent],
  templateUrl: './budget.component.html',
  styles: ``,
})
export class BudgetComponent  implements OnInit, OnDestroy{

  private paramSub!: Subscription;
  houseService = inject(HousesService);
  houseId: string | null = '';

  budget = input.required<BuildingDetails>();
  hasBudget = false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.paramSub = this.route.paramMap.subscribe(params => {
      this.houseId = params.get('houseId');
    });
   }

  async ngOnInit() {
    this.hasBudget = await this.isExistingBudget();
  }
  ngOnDestroy(){
    this.paramSub.unsubscribe();
  }
  async isExistingBudget(): Promise<boolean>
  {
    if(this.houseId)
    {
      return await this.houseService.isBudget(this.houseId);
    }
    console.log('no budget');
    return false;
  }

  calculateTotalBudget(): number
  {
    return (this.budget().inventoryBudget + this.budget().maintenanceBudget);
  }
  RouteToManageBudget()
  {
    if(this.houseId)
    {
      this.router.navigate(['/manage-budget', this.houseId]);
    }
  }
}
