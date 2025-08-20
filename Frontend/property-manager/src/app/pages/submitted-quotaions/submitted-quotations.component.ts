import { Component, OnInit } from '@angular/core';
import { ApiService, getCookieValue } from 'shared';
import { Quote } from 'shared';
import { CommonModule, NgClass, NgStyle } from '@angular/common';
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
  imports: [ CommonModule, NgClass, NgStyle],
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

  //Fixing
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const contractorId = this.getContractorIdFromLocalStorage();
    if (contractorId) {
      this.loadQuotes(contractorId);
    }
  }

  getContractorIdFromLocalStorage(): string | null {
    return getCookieValue(document.cookie, 'contractorId');
  }

  loadQuotes(contractorId: string) {
   this.apiService.getQuotes().subscribe({
    next: (data) => {
      // Trim and compare strings to avoid whitespace issues
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
}