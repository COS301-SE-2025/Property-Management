import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, effect, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IonContent } from "@ionic/angular/standalone";
import { HousesService, Property, StorageService } from 'shared';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from "src/app/components/tab/tab.component";
import { BudgetComponent } from "./budget/budget.component";
import { InventoryComponent } from "./inventory/inventory.component";
import { TimelineComponent } from "./timeline/timeline.component";
import { UpdateHouseComponent } from '../home/update-house/update-house.component';

@Component({
  selector: 'app-view-house',
  templateUrl: './view-house.component.html',
  styles: ``,
  imports: [IonContent, TabComponent, HeaderComponent, CommonModule, BudgetComponent, InventoryComponent, TimelineComponent, UpdateHouseComponent],
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
export class ViewHouseComponent  implements OnInit {

  public house = signal<Property | undefined>(undefined);
  public findHouse = signal(false);
  public images = signal<string[]>([]);
  public currentIndex = signal(0);
  private houseId: string | null = null;

  constructor(private route: ActivatedRoute, public houseService: HousesService, private storage: StorageService) {
    effect(() => {
      const h = this.house();
      if (h && h.buildingUuid) {
        const noImage = 'assets/images/no_image.png';
        this.loadImages(h.buildingUuid).then(images => {
          this.images.set(images.length > 0 ? images : [h.propertyImage || noImage]);
        }).catch(err => {
          console.error('Error loading images', err);
          this.images.set([h.propertyImage || noImage]);
        });
      }
    });

    effect(() => {
      const houses = this.houseService.houses();

      const sub = this.route.paramMap.subscribe(params => {
        const houseId = params.get('houseId');

        if(houseId && houses.length > 0)
        {
          const house = this.houseService.getHouseById(houseId);

          if(house)
          {
            this.house.set(house);
          }
          else
          {
            this.findHouse.set(true);
          }
        }
        else{
          this.findHouse.set(true);
        }
      });

      return () => sub.unsubscribe();
    });
   }

  async ngOnInit() {
    let id = await this.storage.get('trusteeId');

    if(!id)
    {
      id = await this.storage.get("bodyCorporateId");
    }

     const sub = this.route.paramMap.subscribe(async params => {
      this.houseId = params.get('houseId');
      
      try{
        await Promise.all([
          this.houseService.loadHouses(id),
          this.houseService.loadInventory(this.houseId!),
          this.houseService.loadBudget(this.houseId!),
          this.houseService.loadTasks(this.houseId!)
        ]);
      }
      catch(error)
      {
        console.error("Error loading data:", error);
        this.findHouse.set(true);
      }
    });
    sub.unsubscribe();
  }

  private async loadImages(buildingUuid: string): Promise<string[]> {
    try {
      const imageUrls = await this.houseService.getImagesForBuilding(buildingUuid);
      return imageUrls;
    } catch (err) {
      console.error('Failed to load images for building', err);
      return [];
    }
  }
}