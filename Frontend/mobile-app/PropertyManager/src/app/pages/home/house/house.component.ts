import { Component, inject, input, OnInit, signal } from '@angular/core';
import { IonItem} from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { BodyCoporateService, HousesService } from 'shared';
import { Property } from 'shared';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-house',
  templateUrl: './house.component.html',
  styles: ``,
  imports: [IonItem, CommonModule],
})
export class HouseComponent implements OnInit {

  constructor(private router: Router) { }

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
    this.router.navigate(['view-house', houseId]);
  }
}
