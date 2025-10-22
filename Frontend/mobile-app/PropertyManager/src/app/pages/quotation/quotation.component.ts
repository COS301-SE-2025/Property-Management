import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService, BodyCoporateApiService, BuildingApiService, MaintenanceTask, StorageService, TaskApiService } from 'shared';
import { MessageService } from 'primeng/api';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from "src/app/components/tab/tab.component";
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';
import { addIcons } from 'ionicons';
import { calendarOutline,newspaperOutline,walletOutline,cloudUploadOutline, documentOutline, cashOutline } from 'ionicons/icons';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PopoverController } from '@ionic/angular';
import { DatePopoverComponent } from './date-popover/date-popover.component';
import { ToastController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [FormsModule, CommonModule, IonicModule,HeaderComponent, TabComponent],
  providers: [MessageService],
  templateUrl: './quotation.component.html',
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.animate-item', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger(100, [
            animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class QuotationComponent implements OnInit {
  private api = inject(ApiService);
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);
  t_uuid: string = '';
  type = 'pending';

  IssueDate: Date = new Date();
  expirationDate: string="";
  quoteNo: string="";
  totalAmount: number=0;
  file: File | null = null;
  filePreviewUrl: string | null = null;
  safeFilePreviewUrl: SafeResourceUrl | null = null;
  isImage: boolean = false;
  showIssueDate = false;
  showExpirationDate = false;
  // UI states
  toastOpen = false;
  toastMsg = '';
  toastColor: 'success' | 'danger' = 'success';
  loading = false;
  previewOpen = false;
  contractorId: string = "";

  task: MaintenanceTask | null = null;
  bcName: string | null =  null;

  constructor(
    private storageService: StorageService, 
    private router: Router, 
    private popover: PopoverController, 
    private toastController: ToastController, 
    private taskApiService: TaskApiService,
    private apiService: ApiService,
    private buildingService: BuildingApiService,
    private bodyCorporateService: BodyCoporateApiService 
  ){}

  async ngOnInit() {
    addIcons({
      'calendar-outline': calendarOutline,
      'newspaper-outline': newspaperOutline,
      'wallet-outline': walletOutline,
      'cloud-upload-outline': cloudUploadOutline,
      'document-outline': documentOutline,
      'cash-outline': cashOutline
    
    });
    this.contractorId =  await this.storageService.get('contractorId');
    this.t_uuid = this.route.snapshot.paramMap.get('t_uuid') ?? '';
    
    //Get task image 
    this.taskApiService.getTaskById(this.t_uuid).subscribe({
      next: (task) => {
        this.task = task;
        if(this.task.img)
        {
          this.apiService.getPresignedImageUrl(this.task.img).subscribe({
            next: (url) => {
              this.task!.img = url;
            },
            error: (err) => {
              console.warn("Couldnt get image", err);
              this.task!.img = 'assets/images/no_image.png'
            }
          })
        }
        else
        {
          this.task!.img = 'assets/images/no_image.png'
        }

        //Get body corporate name
        this.buildingService.getBuildingById(this.task.buuid).subscribe({
          next: (res) => {
            if(res.coporateUuid)
            {
              this.bodyCorporateService.getBodyCoporate(res.coporateUuid).subscribe({
                next: (bc) => {
                  this.bcName = bc.corporateName;
                }
              })
            }
          }
        })
      }
    })

  }

  async openDatePopover(ev: any)
  {
    const popover = await this.popover.create({
      component: DatePopoverComponent,
      event: ev,
      translucent: true
    });
    await popover.present();

    const { data } = await popover.onDidDismiss();
    if(data)
    {
      this.expirationDate = data;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.filePreviewUrl = reader.result as string;
        this.safeFilePreviewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.filePreviewUrl);
        this.isImage = file.type.startsWith('image');
      };
      reader.readAsDataURL(file);
    }
  }

  async submitQuote() {
    if (!this.IssueDate || !this.expirationDate || !this.quoteNo || !this.totalAmount) {
      this.showToast('Please fill in all fields.', 'danger');
      return;
    }

    if(!this.file)
    {
      this.showToast('Please attach the quotation document.', 'danger');
      return;
    }

    try {
      this.loading = true;

      this.api.addQuote(
          this.t_uuid,
          this.contractorId,
          new Date(),
          this.type,
          Number(this.totalAmount),
          this.quoteNo
        ).subscribe({
            next: async() => {
            
            // Handle file upload if a file was selected
            await this.uploadFile();
            this.showToast("Quotation submitted successfully!", 'success');

            setTimeout(() => {
              this.router.navigate(['/contractor-home']).then(() => window.location.reload());
            }, 1500);
          },
          error: (err) => {
            console.error(err);
            this.showToast('Error submitting quotation.', 'danger');
          }
        });
    }
    catch (err) {
      this.showToast(`Error submitting quotation.`, 'danger');
    } finally {
      this.loading = false;
    }
  }

  async uploadFile() {
    if (this.file) {
      try {
        await this.api.uploadPDF(this.file, this.contractorId, "Quote", this.t_uuid);
      } catch (err) {
        console.error('File upload failed:', err);
        this.showToast('File upload failed.', 'danger');
      }
    }
    
    // setTimeout(() => {
    //   this.router.navigate(['/contractor-home']);
    // }, 1500);
  }

  private async showToast(message: string, color: 'success' | 'warning' | 'danger' = 'success') {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      color,      
      position: 'top'
    });
    await toast.present();
  }
}
