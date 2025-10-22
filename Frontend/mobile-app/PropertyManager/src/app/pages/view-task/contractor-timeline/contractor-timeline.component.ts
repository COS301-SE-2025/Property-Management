import { Component, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from '@angular/core';
import { IonCard } from "@ionic/angular/standalone";
import { TimelineModule } from "primeng/timeline";
import { FormatTimePipe } from "../../../../../../../library/projects/shared/src/pipes/format-date-time.pipe";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { CommonModule } from '@angular/common';
import { MaintenanceTask, InventoryUsage, TaskProgress, Inventory, TaskProgresApiService, ImageApiService, InventoryItemApiService, InventoryUsageApiService, StorageService, AuthMobileService } from 'shared';
import { catchError, forkJoin, of, switchMap, tap, from } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { ThemeService } from 'src/app/services/theme.service';
import { ProgressDialogComponent } from "../progress-dialog/progress-dialog.component";
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contractor-timeline',
  templateUrl: './contractor-timeline.component.html',
  styles: `
    .carousel {
      position: relative;
      max-width: 100%;
      overflow: hidden;
    }
    .carousel-inner {
      display: flex;
      transition: transform 0.3s ease-in-out;
    }
    .carousel-item {
      width: 100%;
      flex: 0 0 auto;
    }
    .carousel-prev,
    .carousel-next {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 8px;
      cursor: pointer;
      transition: background-color 0.3s;
    }
    .carousel-prev:hover,
    .carousel-next:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
    .carousel-prev {
      left: 0;
      border-radius: 0 4px 4px 0;
    }
    .carousel-next {
      right: 0;
      border-radius: 4px 0 0 4px;
    }
  `,
  imports: [ IonCard, CardModule, TimelineModule, FormatTimePipe, TableModule, CommonModule, ProgressDialogComponent],
})
export class ContractorTimelineComponent implements OnInit, OnChanges {

    @Input() task!: MaintenanceTask;
    @Input() inventoryUsage!: InventoryUsage[];
    public timeline = signal<TaskProgress[]>([]);
    public inventoryUsageContractor = signal<Inventory[]>([]);
    public usageUsedByContractor = new Map<string, number>();
    public contractorUser = false;
    public darkMode = false;
    public currentImageIndex = signal<number[]>([]);
    public imageUrlsByProgress = signal<Record<string, string[]>>({});

    public isDone = false;
    
  constructor(
     private taskProgressService: TaskProgresApiService, 
      private imageService: ImageApiService,
      private inventoryUsageService: InventoryUsageApiService,
      private inventoryItemService: InventoryItemApiService,
      private authService: AuthMobileService,
      private themeService: ThemeService
  ) { }

  async ngOnInit() {

    this.contractorUser = false;
    if(await this.authService.getUserType() === 'contractor')
    {
        this.contractorUser = true;
    }
    this.themeService.darkMode$.subscribe(mode => {
        this.darkMode = mode;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['task'] && this.task)
    {
        this.loadTimelineData();
    }
    if (changes['inventoryUsage'] && this.inventoryUsage) {
        this.trackQuantityUsed();
    }
  }

  private async getImagesForProgress(progressUuid: string): Promise<string[]> {
    try {
      const imageResponse = await firstValueFrom(
        this.imageService.getImages('', '', progressUuid, '')
      );

      let imageUrls: string[] = [];

      if (Array.isArray(imageResponse)) {
        imageUrls = imageResponse
          .map(img => img.presignedUrl)
          .filter(url => url && url.trim() !== '');
      } else if (typeof imageResponse === 'string') {
        try {
          const parsed = JSON.parse(imageResponse);
          if (Array.isArray(parsed)) {
            imageUrls = parsed
              .map(img => img.presignedUrl)
              .filter(url => url && url.trim() !== '');
          }
        } catch {
          imageUrls = imageResponse
            .split(',')
            .map(url => url.trim())
            .filter(url => url !== '');
        }
      }

      return imageUrls.length > 0 ? imageUrls : ['assets/images/no_image.png'];
    } catch (err) {
      return ['assets/images/no_image.png'];
    }
  }

  private loadTimelineData() {
    this.isDone = false;
    this.taskProgressService.getTaskProgressByTaskId(this.task.uuid).pipe(
      switchMap((progressItems: TaskProgress[]) => {

        if (progressItems.length === 0) {
          this.timeline.set([]);
          this.currentImageIndex.set([]);
          this.imageUrlsByProgress.set({});
          return of([]);
        }

        progressItems.forEach(i => {
          if(i.progressPercentage === 100)
          {
            this.isDone = true;
          }
        })

        progressItems.sort((a, b) => {
          const dateA = this.toDate(a.submissionDate);
          const dateB = this.toDate(b.submissionDate);
          
          const timeA = dateA.getTime();
          const timeB = dateB.getTime();
          
          if (isNaN(timeA) || isNaN(timeB)) {
            return 0;
          }
          
          return timeA - timeB;
        });

        this.currentImageIndex.set(new Array(progressItems.length).fill(0));

        const timelineProcessing = progressItems.map((p, index) => {
          p.imageId = p.imageId ? p.imageId : 'assets/images/no_image.png';
          p.subDate = this.toDate(p.submissionDate);

          const imageRequest = p.progressUuid
            ? from(this.getImagesForProgress(p.progressUuid)).pipe(
                tap(urls => {
                  this.imageUrlsByProgress.update(current => {
                    const updated: Record<string, string[]> = { ...current };
                    updated[p.progressUuid!] = urls;
                    return updated;
                  });
                }),
                catchError(err => {
                  this.imageUrlsByProgress.update(current => {
                    const updated: Record<string, string[]> = { ...current };
                    updated[p.progressUuid!] = ['assets/images/no_image.png'];
                    return updated;
                  });
                  return of(['assets/images/no_image.png']);
                })
              )
            : of([p.imageId]);

          return imageRequest.pipe(
            tap(images => {

            }),
            switchMap(() => {
              if (p.inventoryUsageUuid) {
                return this.processInventoryUsage(p.inventoryUsageUuid, p.quantityUsed);
              }
              return of(null);
            }),
            tap(() => {
              this.timeline.update(current => [...current, p]);
            })
          );
        });

        return forkJoin(timelineProcessing).pipe(
          tap(() => {
            progressItems.forEach((p, i) => {
            });
            this.timeline.set([...progressItems]);
          })
        );
      }),
      catchError((err: HttpErrorResponse) => {
        if (err.status === 404) {
          this.timeline.set([]);
          this.currentImageIndex.set([]);
          this.imageUrlsByProgress.set({});
        } else {
        }
        return of([]);
      })
    ).subscribe(() => {
      this.trackQuantityUsed();
    });
  }

  private processInventoryUsage(usageId: string, quantity: number) {
    return this.inventoryUsageService.getInventoryUsageById(usageId).pipe(
      switchMap(usage => 
        this.inventoryItemService.getInventoryItemsById(usage.itemUuid).pipe(
          tap(item => {
            item.quantityInStock = quantity;
            this.inventoryUsageContractor.update(current => [...current, item]);
          }),
          catchError(error => {
            return of(null);
          })
        )
      ),
      catchError(error => {
        return of(null);
      })
    );
  }

  trackQuantityUsed() {
    if (!this.inventoryUsage || this.inventoryUsage.length === 0) return;
    if (this.inventoryUsageContractor().length === 0) return;

    this.inventoryUsage.forEach(i => {
      this.usageUsedByContractor.set(i.usageUuid, i.quantityUsed);
    });

    this.usageUsedByContractor.forEach((qty, id) => {
      this.inventoryUsageContractor().forEach(i => {
        if(id === i.itemUuid)
        {
          this.usageUsedByContractor.set(id, qty-i.quantityInStock);
        }
      });
    });
  }

  private toDate(dateInput: number[] | string | Date | undefined): Date {
    if (!dateInput) {
      return new Date();
    }

    if (dateInput instanceof Date) {
      return dateInput;
    }

    if (typeof dateInput === 'string') {
      const parsed = new Date(dateInput);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
      return new Date();
    }

    if (Array.isArray(dateInput)) {
      if (dateInput.length < 3 || !dateInput.every(val => typeof val === 'number' && !isNaN(val))) {
        return new Date();
      }

      const date = new Date(
        dateInput[0],
        dateInput[1] - 1,
        dateInput[2],
        dateInput[3] || 0,
        dateInput[4] || 0,
        dateInput[5] || 0,
        dateInput[6] || 0
      );

      if (isNaN(date.getTime())) {
        return new Date();
      }

      return date;
    }

    return new Date();
  }

  prevImage(timelineIndex: number) {
    this.currentImageIndex.update(indices => {
      const newIndices = [...indices];
      if (newIndices[timelineIndex] > 0) {
        newIndices[timelineIndex]--;
      }
      return newIndices;
    });
  }

  nextImage(timelineIndex: number) {
    this.currentImageIndex.update(indices => {
      const newIndices = [...indices];
      const progressUuid = this.timeline()[timelineIndex].progressUuid;
      const maxIndex = progressUuid && this.imageUrlsByProgress()[progressUuid]?.length - 1 || 0;
      if (newIndices[timelineIndex] < maxIndex) {
        newIndices[timelineIndex]++;
      }
      return newIndices;
    });
  }

  goToImage(timelineIndex: number, imageIndex: number) {
    this.currentImageIndex.update(indices => {
      const newIndices = [...indices];
      newIndices[timelineIndex] = imageIndex;
      return newIndices;
    });
  }

  getImagesForTimeline(progressUuid: string | undefined): string[] {
    if (!progressUuid) return [];
    return this.imageUrlsByProgress()[progressUuid] || [];
  }
}