import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { BodyCoporateService, HousesService } from 'shared';
import { Router } from '@angular/router';
import { Property } from 'shared';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-house-card',
  imports: [CardModule, CommonModule],
  templateUrl: './house-card.component.html',
  styles: ``
})
export class HouseCardComponent implements OnInit {

  constructor(private router: Router){}
  houseService = inject(HousesService);
  bodyCorporateService = inject(BodyCoporateService);

  house = input.required<Property>();
  bcName = signal<string | null>(null);

  async ngOnInit()
  {
    const cId = this.house().coporateUuid;
    if(cId)
    {
      try{
        const name = await firstValueFrom(this.bodyCorporateService.getBodyCorporateName(cId));
        this.bcName.set(name);
      }
      catch(err) 
      {
        console.error('Failed to get body corporate name', err);
        this.bcName.set('Unknown');
      }
    }
  }

  viewHouse(houseId: string)
  {
    this.router.navigate(['viewHouse', houseId])
  }
}
