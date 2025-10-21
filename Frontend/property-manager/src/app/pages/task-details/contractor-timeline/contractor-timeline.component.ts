import { Component, Input, input, OnChanges, OnInit, signal, SimpleChanges } from "@angular/core";
import { ContractorDetails, ImageApiService, MaintenanceTask, TaskProgresApiService, TaskProgress, FormatTimePipe, getCookieValue, InventoryUsage, Inventory, InventoryUsageApiService, InventoryItemApiService, ImageWithPresignedUrl } from "shared";
import { CardModule } from "primeng/card";
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { TimelineModule } from "primeng/timeline";
import { AddProgressDialogComponent } from "../add-progress-dialog/add-progress-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { TableModule } from "primeng/table";
import { forkJoin, of, from } from "rxjs"; // Added 'from' import here
import { switchMap, catchError, tap, map } from "rxjs/operators";
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-contractor-timeline',
  templateUrl: './contractor-timeline.component.html',
  styles: `
    .timeline-title {
      color: #facc15;
    }
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
  imports: [CardModule, Toast, TimelineModule, CommonModule, FormatTimePipe, AddProgressDialogComponent, TableModule],
  providers: [MessageService]
})
export class ContractorTimelineComponent implements OnInit, OnChanges {
  public task = input.required<MaintenanceTask>();
  @Input() inventoryUsage!: InventoryUsage[];
  public timeline = signal<TaskProgress[]>([]);
  public inventoryUsageContractor = signal<Inventory[]>([]);
  public usageUsedByContractor = new Map<string, number>();
  public contractorUser = false;
  public trusteeUser = false;
  public darkMode = false;
  public currentImageIndex = signal<number[]>([]);
  public imageUrlsByProgress = signal<Record<string, string[]>>({});

  public isDone = false;

  constructor(
    private taskProgressService: TaskProgresApiService,
    private messageService: MessageService,
    private imageService: ImageApiService,
    private inventoryUsageService: InventoryUsageApiService,
    private inventoryItemService: InventoryItemApiService,
    private router: Router
  ) {}

  ngOnInit() {
    if (getCookieValue(document.cookie, 'contractorId')) {
      this.contractorUser = true;
    } else if (getCookieValue(document.cookie, 'trusteeId')) {
      this.trusteeUser = true;
    }
    this.darkMode = localStorage.getItem('darkMode') === 'true';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task()) {
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

      //console.log('Raw image response for progress:', progressUuid, imageResponse);
      //console.log('Response type:', typeof imageResponse);

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

      //console.log('Processed image URLs for progress:', progressUuid, imageUrls);
      return imageUrls.length > 0 ? imageUrls : ['assets/images/no_image.png'];
    } catch (err) {
      console.error('Error fetching images for progress', progressUuid, err);
      return ['assets/images/no_image.png'];
    }
  }

  private loadTimelineData() {
    //console.log('=== LOADING TIMELINE DATA ===');
    //console.log('Task UUID:', this.task().uuid);
    this.isDone = false;
    this.taskProgressService.getTaskProgressByTaskId(this.task().uuid).pipe(
      switchMap((progressItems: TaskProgress[]) => {
        //console.log('Progress items received:', progressItems.length);
        //console.log('Progress items raw data:', progressItems);

        if (progressItems.length === 0) {
          this.timeline.set([]);
          this.currentImageIndex.set([]);
          this.imageUrlsByProgress.set({});
          return of([]);
        }

        progressItems.sort((a, b) => {
        const dateA = this.toDate(a.submissionDate);
        const dateB = this.toDate(b.submissionDate);
        
        // Additional safety check
        const timeA = dateA.getTime();
        const timeB = dateB.getTime();
        
        if (isNaN(timeA) || isNaN(timeB)) {
          console.error('Invalid date comparison:', { a: a.submissionDate, b: b.submissionDate });
          return 0;
        }
        
        return timeA - timeB;
      });

      progressItems.forEach(i => {
        if(i.progressPercentage === 100)
        {
          this.isDone = true;
        }
      })

        this.currentImageIndex.set(new Array(progressItems.length).fill(0));

        const timelineProcessing = progressItems.map((p, index) => {
          //console.log(`\n--- Processing progress item ${index + 1} ---`);
          //console.log('Progress UUID:', p.progressUuid);
          //console.log('Original imageId:', p.imageId);
          //console.log('Image ID type:', typeof p.imageId);

          p.imageId = p.imageId ? p.imageId : 'assets/images/no_image.png';
          p.subDate = this.toDate(p.submissionDate);

          const imageRequest = p.progressUuid
            ? from(this.getImagesForProgress(p.progressUuid)).pipe(
                tap(urls => {
                  //console.log(`URLs for progress ${p.progressUuid}:`, urls);
                  this.imageUrlsByProgress.update(current => {
                    const updated: Record<string, string[]> = { ...current };
                    updated[p.progressUuid!] = urls;
                    return updated;
                  });
                }),
                catchError(err => {
                  console.error(`Error fetching images for progress ${p.progressUuid}:`, err);
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
              //console.log(`Setting image URLs for progress ${index + 1}:`, images);
            }),
            switchMap(() => {
              if (p.inventoryUsageUuid) {
                //console.log('Processing inventory usage:', p.inventoryUsageUuid);
                return this.processInventoryUsage(p.inventoryUsageUuid, p.quantityUsed);
              }
              return of(null);
            }),
            tap(() => {
              //console.log(`Adding progress ${index + 1} to timeline`);
              this.timeline.update(current => [...current, p]);
            })
          );
        });

        return forkJoin(timelineProcessing).pipe(
          tap(() => {
            //console.log('\n=== FINAL TIMELINE ===');
            //console.log('Total items:', progressItems.length);
            progressItems.forEach((p, i) => {
              //console.log(`Item ${i + 1} final image URLs:`, p.progressUuid ? this.imageUrlsByProgress()[p.progressUuid] : [p.imageId]);
            });
            this.timeline.set([...progressItems]);
          })
        );
      }),
      catchError((err: HttpErrorResponse) => {
        console.error('Error loading timeline:', err);
        if (err.status === 404) {
          //console.log('No timeline data found (404)');
          this.timeline.set([]);
          this.currentImageIndex.set([]);
          this.imageUrlsByProgress.set({});
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to load contractor timeline',
          });
          console.error('Timeline error details:', err);
        }
        return of([]);
      })
    ).subscribe(() => {
      //console.log('=== TIMELINE LOADING COMPLETE ===');
      //console.log('Final timeline state:', this.timeline());
      //console.log('Final image URLs:', this.imageUrlsByProgress());
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
            console.error("Error fetching inventory", error);
            return of(null);
          })
        )
      ),
      catchError(error => {
        console.error("Error fetching inventory usage", error);
        return of(null);
      })
    );
  }

  trackQuantityUsed() {
    if (!this.inventoryUsage || this.inventoryUsage.length === 0) return;
    if (this.inventoryUsageContractor().length === 0) return;

    const map = new Map<string, number>();

    this.inventoryUsage.forEach(i => {
      this.usageUsedByContractor.set(i.usageUuid, i.quantityUsed);
    });

    this.usageUsedByContractor.forEach((qty, id) => {
      this.inventoryUsageContractor().forEach(i => {
        if (id === i.itemUuid) {
          this.usageUsedByContractor.set(id, qty - i.quantityInStock);
        }
      });
    });
  }

  navigateToReview(type: 'write' | 'read', taskId: string) {
    this.router.navigate(['/ratings', taskId]);
  }

    private toDate(dateInput: number[] | string | Date | undefined): Date {
    // Handle undefined/null
    if (!dateInput) {
      console.warn('toDate received undefined/null date, using current date');
      return new Date();
    }

    // If it's already a Date object
    if (dateInput instanceof Date) {
      return dateInput;
    }

    // If it's a string (PostgreSQL timestamp format like "2025-08-12 08:21:28.208033+00")
    if (typeof dateInput === 'string') {
      // PostgreSQL format can be parsed directly by JavaScript Date constructor
      const parsed = new Date(dateInput);
      if (!isNaN(parsed.getTime())) {
        return parsed;
      }
      console.error('Invalid date string:', dateInput);
      return new Date();
    }

    // If it's an array format [year, month, day, hour, minute, second?, millisecond?]
    // (Keep this for backward compatibility if needed)
    if (Array.isArray(dateInput)) {
      if (dateInput.length < 3 || !dateInput.every(val => typeof val === 'number' && !isNaN(val))) {
        console.error('Invalid date array format:', dateInput);
        return new Date();
      }

      const date = new Date(
        dateInput[0],           // year
        dateInput[1] - 1,       // month (convert from 1-indexed to 0-indexed)
        dateInput[2],           // day
        dateInput[3] || 0,      // hour (default 0)
        dateInput[4] || 0,      // minute (default 0)
        dateInput[5] || 0,      // second (default 0)
        dateInput[6] || 0       // millisecond (default 0)
      );

      if (isNaN(date.getTime())) {
        console.error('Created invalid date from array:', dateInput);
        return new Date();
      }

      return date;
    }

    // Fallback for unknown format
    console.error('Unknown date format:', dateInput, 'Type:', typeof dateInput);
    return new Date();
  }


  // Carousel navigation methods
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

  // Helper method to get images safely
  getImagesForTimeline(progressUuid: string | undefined): string[] {
    if (!progressUuid) return [];
    return this.imageUrlsByProgress()[progressUuid] || [];
  }
}