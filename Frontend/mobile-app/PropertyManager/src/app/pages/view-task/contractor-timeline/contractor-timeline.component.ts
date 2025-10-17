import { Component, Input, OnChanges, OnInit, signal, SimpleChanges } from '@angular/core';
import { IonCard } from "@ionic/angular/standalone";
import { TimelineModule } from "primeng/timeline";
import { FormatTimePipe } from "../../../../../../../library/projects/shared/src/pipes/format-date-time.pipe";
import { TableModule } from "primeng/table";
import { CardModule } from "primeng/card";
import { CommonModule } from '@angular/common';
import { MaintenanceTask, InventoryUsage, TaskProgress, Inventory, TaskProgresApiService, ImageApiService, InventoryItemApiService, InventoryUsageApiService, StorageService, AuthMobileService } from 'shared';
import { catchError, forkJoin, of, switchMap, tap } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/module.d-CnjH8Dlt';
import { ThemeService } from 'src/app/services/theme.service';
import { ProgressDialogComponent } from "../progress-dialog/progress-dialog.component";

@Component({
  selector: 'app-contractor-timeline',
  templateUrl: './contractor-timeline.component.html',
  styles: ``,
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
  private loadTimelineData() {
        this.taskProgressService.getTaskProgressByTaskId(this.task.uuid).pipe(
            switchMap((progressItems: TaskProgress[]) => {
                if (progressItems.length === 0) {
                    this.timeline.set([]);
                    return of([]);
                }

                 progressItems.sort((a, b) => {
                    const dateA = this.toDate(a.submissionDate).getTime();
                    const dateB = this.toDate(b.submissionDate).getTime();
                    return dateA - dateB;
                });

                const timelineProcessing = progressItems.map(p => {

                    p.imageId = p.imageId ? p.imageId : 'assets/images/no_image.png';
                    p.subDate = this.toDate(p.submissionDate);

                    const imageRequest = p.imageId && p.imageId !== 'assets/images/no_image.png' 
                        ? this.imageService.getImage(p.imageId).pipe(
                            catchError(() => of('assets/images/no_image.png'))
                        )
                        : of(p.imageId);

                    return imageRequest.pipe(
                        tap(image => p.imageId = image),
                        switchMap(() => {
                            if (p.inventoryUsageUuid) {
                                return this.processInventoryUsage(p.inventoryUsageUuid, p.quantityUsed);
                            }
                            return of(null);
                        }),
                        tap(() => this.timeline.update(current => [...current, p]))
                    );
                });

                return forkJoin(timelineProcessing).pipe(
                    tap(() => {
                        this.timeline.set(progressItems);
                    })
                );
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    this.timeline.set([]);
                } else {
                    // this.messageService.add({
                    //     severity: 'error',
                    //     summary: 'Error',
                    //     detail: 'Failed to load contractor timeline',
                    // });
                    console.error(err);
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
    private toDate(arr: number[]): Date {
      return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]);
    }
}
