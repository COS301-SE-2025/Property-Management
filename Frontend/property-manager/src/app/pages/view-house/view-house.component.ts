import { Component, effect, OnInit, signal } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { getCookieValue, HousesService } from 'shared';
import { ActivatedRoute } from '@angular/router';
import { CardModule } from 'primeng/card';
import { InventoryCardComponent } from "./inventory-card/inventory-card.component";
import { BudgetCardComponent } from "./budget-card/budget-card.component";
import { TimelineCardComponent } from "./timeline-card/timeline-card.component";
import { Property } from 'shared';
import { UpdateHouseDialogComponent } from './update-house-dialog/update-house-dialog.component'; 

@Component({
  selector: 'app-view-house',
  imports: [CommonModule, CardModule, InventoryCardComponent, BudgetCardComponent, TimelineCardComponent, UpdateHouseDialogComponent],
  templateUrl: './view-house.component.html',
  styleUrls: ['./view-house.component.scss'],
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
export class ViewHouseComponent implements OnInit {
  public house = signal<Property | undefined>(undefined);
  public findHouse = signal(false);
  public images = signal<string[]>([]);
  public currentIndex = signal(0);
  private houseId: string | null = null;

  constructor(private route: ActivatedRoute, public houseService: HousesService) {
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
  }

  async ngOnInit() {
    this.houseId = this.route.snapshot.paramMap.get('houseId');

    if (!this.houseId) {
      this.findHouse.set(true);
      return;
    }

    try {
      const id = await this.getId();
      await this.loadData(id);
    } catch (err) {
      console.error("Couldnt get house data", err);
      this.findHouse.set(true);
    }
  }

  private async getId(): Promise<string> {
    const cookieId = getCookieValue(document.cookie, 'trusteeId');
    
    const house = await this.houseService.loadHouseById(this.houseId!);

    if (!house) {
      throw new Error('House not found');
    }
      
    this.house.set(house);
    if (cookieId) return cookieId; 
    return house.trusteeUuid!;
  }

  private async loadData(id: string) {
    await Promise.all([
      this.houseService.loadInventory(this.houseId!),
      this.houseService.loadBudget(this.houseId!),
      this.houseService.loadTasks(this.houseId!)
    ]);
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