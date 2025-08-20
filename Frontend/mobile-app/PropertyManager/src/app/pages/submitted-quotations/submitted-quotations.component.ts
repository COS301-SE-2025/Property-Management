import { Component, OnInit } from '@angular/core';
import { 
  IonContent, 
  IonCard, 
  IonCardHeader, 
  IonCardTitle, 
  IonCardContent,
  IonBadge,
  IonLabel,
  IonList,
  IonItem,
  IonIcon
} from '@ionic/angular/standalone';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import { ApiService, StorageService } from 'shared';
import { Quote } from 'shared';
import { addIcons } from 'ionicons';
import { folderOpenOutline } from 'ionicons/icons';
import { TabComponent } from 'src/app/components/tab/tab.component';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-submitted-quotations',
  templateUrl: './submitted-quotations.component.html',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    IonLabel,
    IonList,
    IonItem,
    IonIcon,
    TabComponent
  ],
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
export class SubmittedQuotationsComponent implements OnInit {
  quotes: Quote[] = [];
 
  constructor(private apiService: ApiService, private storageService: StorageService) {
    addIcons({ folderOpenOutline });
  }

  async ngOnInit() {
    const contractorId = this.getContractorIdFromLocalStorage();
    if (contractorId) {
      this.loadQuotes(await contractorId);
    }
  }

  async getContractorIdFromLocalStorage() {
    const id = await this.storageService.get('contractorId');
    return id;
  }
  expiryDate(quote: Quote): string {
    return quote.expiry_date ? new Date(quote.expiry_date).toLocaleString() : 'No expiry';
  }

  loadQuotes(contractorId: string) {
    this.apiService.getQuotes().subscribe({
      next: (data) => {
        this.quotes = data.filter(q => 
          q.c_uuid?.toString().trim() === contractorId?.toString().trim()
        );
        
        if (this.quotes.length === 0) {
          console.warn('No quotes found for contractor', contractorId);
        }
      },
      error: (err) => {
        console.error('Failed to load quotes:', err);
      }
    });
  }

  quoteDate(quote: Quote): string {
    return new Date(quote.submitted_on).toLocaleString();
  }

  getStatusColor(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'medium';
      case 'successful':
        return 'success';
      case 'unsuccessful':
        return 'danger';
      default:
        return 'primary';
    }
  }
}