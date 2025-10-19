import { Component, inject, OnInit, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { ListboxModule } from 'primeng/listbox';
import { CommonModule } from '@angular/common';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';
import { ApiService, BodyCoporateService } from 'shared';
import { ActivatedRoute, Router } from '@angular/router';
import { ContractorDetails, FormatPhoneNumberPipe, getCookieValue, ContractorApiService, ImageApiService, FormatFileName } from 'shared';
import { catchError, forkJoin, of } from 'rxjs';

@Component({
  selector: 'app-contractor-details',
  imports: [CommonModule, TableModule, ListboxModule, FormatPhoneNumberPipe, ToastModule, FormatFileName, RatingModule, FormsModule],
  templateUrl: './contractor-details.component.html',
  styles: `
    :host ::ng-deep .p-rating .p-rating-icon {
      color: #facc15 !important; 
    }
    :host ::ng-deep .p-rating .p-rating-icon:hover {
      color: #fbbf24 !important; 
    }
  `,
  providers: [MessageService]
})
export class ContractorDetailsComponent implements OnInit{

  bodyCoporateService = inject(BodyCoporateService);
  contractorService = inject(ContractorApiService);
  imageService = inject(ImageApiService);

  contractorDetails = this.bodyCoporateService.contractorDetails;
  currentContractor = signal<ContractorDetails | null>(null);

  public publicContractor = true;

  constructor(private route: ActivatedRoute, private router: Router, private messageService: MessageService, private apiService: ApiService){}

  ngOnInit(): void {
      const source = this.route.snapshot.paramMap.get('source');
      this.publicContractor = source === 'public';

      const contractorId = this.route.snapshot.paramMap.get('contractorId');

      const foundContractor = this.contractorDetails().find(c => c.uuid === contractorId);

      if(foundContractor)
      {
        //Get pdfs
        const pdfReq = [
          this.apiService.getContractorPDF(contractorId!, 'certifications', "").pipe(catchError(() => of(null))),
          this.apiService.getContractorPDF(contractorId!, 'licenses', "").pipe(catchError(() => of(null))),
          this.apiService.getContractorPDF(contractorId!, 'ids', "").pipe(catchError(() => of(null))),
          this.apiService.getContractorPDF(contractorId!, 'projectRecords', "").pipe(catchError(() => of(null))) 
        ];
          forkJoin(pdfReq).subscribe({
          next: (res) => {
            const [certifications, licenses, ids, projectRecords] = res;
            foundContractor.certifications = certifications ?? undefined;
            foundContractor.licenses = licenses ?? undefined;
            foundContractor.ids = ids ?? undefined;
            foundContractor.projectRecords = projectRecords ?? undefined;

            this.contractorService.getAverageRating(contractorId!).subscribe({
              next: (res) => {
                foundContractor.averageRating = res;
                this.currentContractor.set(foundContractor);
              },
              error: (err) => {
                console.error("Error getting average rating", err);
                foundContractor.averageRating = 0;
                this.currentContractor.set(foundContractor);
              }
            })
          },
          error: () => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to load contractor details'
            });
          }
        });
      }
      else{
        this.contractorService.getContractorById(contractorId!).subscribe(contractor => {
          if (contractor) {
            //Get pdfs
            const pdfReq = [
              this.apiService.getContractorPDF(contractorId!, 'certifications', "").pipe(catchError(() => of(null))),
              this.apiService.getContractorPDF(contractorId!, 'licenses', "").pipe(catchError(() => of(null))),
              this.apiService.getContractorPDF(contractorId!, 'ids', "").pipe(catchError(() => of(null))),
              this.apiService.getContractorPDF(contractorId!, 'projectRecords', "").pipe(catchError(() => of(null)))
            ];

            forkJoin(pdfReq).subscribe({
              next: (res) => {
                const [certifications, licenses, ids, projectRecords] = res;
                contractor.certifications = certifications ?? undefined;
                contractor.licenses = licenses ?? undefined;
                contractor.ids = ids ?? undefined;
                contractor.projectRecords = projectRecords ?? undefined;

                this.imageService.getImage(contractor.img ?? '').subscribe(i => {
                  this.currentContractor.set(contractor);
                  const curr = this.currentContractor();
                  if (curr) {
                    curr.img = i;

                    this.contractorService.getAverageRating(contractorId!).subscribe({
                      next: (res) => {
                        curr.averageRating = res;
                        this.currentContractor.set(curr);
                      }
                    })
                  }
                })
              },
              error: () => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Error',
                  detail: 'Failed to load contractor details'
                })
              }
            })

          }
        });
      }
  }

  makePublicContractor(): void{
    this.publicContractor = true;
  }
  
  async makeTrustedContractor(){
    this.publicContractor = false;
    
    const contractor = this.currentContractor();

    if (contractor !== null) 
    {
      const bcId = getCookieValue(document.cookie, 'bodyCoporateId');

      this.bodyCoporateService.makeContractorTrusted(bcId, contractor.uuid).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Contractor succesfully added'
          });
          setTimeout(() => {
            this.router.navigate(['bodyCoporate/contractors']).then(() => {
              window.location.reload();
            });
          }, 2000);
        },
        error: () => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to add contractor, please try again'
          })
        }
      });
    }
  }
}
