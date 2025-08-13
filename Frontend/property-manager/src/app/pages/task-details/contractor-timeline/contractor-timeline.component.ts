import { Component, Input, input, OnChanges, OnInit, signal, SimpleChanges } from "@angular/core";
import { ContractorDetails, ImageApiService, MaintenanceTask, TaskProgresApiService, TaskProgress, FormatTimePipe, getCookieValue, InventoryUsage, Inventory, InventoryUsageApiService, InventoryItemApiService } from "shared";
import { CardModule } from "primeng/card";
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { CommonModule } from "@angular/common";
import { TimelineModule } from "primeng/timeline";
import { AddProgressDialogComponent } from "../add-progress-dialog/add-progress-dialog.component";
import { HttpErrorResponse } from "@angular/common/http";
import { TableModule } from "primeng/table";
import { forkJoin, of } from "rxjs";
import { switchMap, catchError, tap } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: 'app-contractor-timeline',
  templateUrl: './contractor-timeline.component.html',
  styles: `
    .timeline-title{
        color: #facc15;
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
    public bcUser = false;
    public darkMode = false;

    constructor(
        private taskProgressService: TaskProgresApiService, 
        private messageService: MessageService, 
        private imageService: ImageApiService,
        private inventoryUsageService: InventoryUsageApiService,
        private inventoryItemService: InventoryItemApiService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadTimelineData();
        
        if (getCookieValue(document.cookie, 'contractorId')) {
            this.contractorUser = true;
        } else if (getCookieValue(document.cookie, 'bodyCorporateId')) {
            this.bcUser = true;
        }
        this.darkMode = localStorage.getItem('darkMode') === 'true';
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['inventoryUsage'] && this.inventoryUsage) {
            this.trackQuantityUsed();
        }
    }

    private loadTimelineData() {
        this.taskProgressService.getTaskProgressByTaskId(this.task().uuid).pipe(
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
                        this.timeline.set([...progressItems]);
                    })
                );
            }),
            catchError((err: HttpErrorResponse) => {
                if (err.status === 404) {
                    this.timeline.set([]);
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Failed to load contractor timeline',
                    });
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

        const map = new Map<string, number>();

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

    navigateToReview(type: 'write' | 'read', taskId: string) {
        this.router.navigate(['/ratings', taskId]);
    }   

    private toDate(arr: number[]): Date {
        return new Date(arr[0], arr[1]-1, arr[2], arr[3], arr[4]);
    }
}