import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Quote } from '../../models/quote.model';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule, NgClass, NgStyle } from '@angular/common';

@Component({
  selector: 'app-submitted-quotations',
  templateUrl: './submitted-quotations.component.html',
  standalone: true,
  imports: [HeaderComponent, CommonModule, NgClass, NgStyle]
})
export class SubmittedQuotationsComponent implements OnInit {
  quotes: Quote[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const contractorId = this.getContractorIdFromLocalStorage();
    if (contractorId) {
      this.loadQuotes(contractorId);
    }
  }

  getContractorIdFromLocalStorage(): string | null {
    return localStorage.getItem('contractorID');
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