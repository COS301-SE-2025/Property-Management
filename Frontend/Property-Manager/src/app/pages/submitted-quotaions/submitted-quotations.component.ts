import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CommonModule } from '@angular/common';
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
    imports: [HeaderComponent, CommonModule],
  templateUrl: './submitted-quotations.component.html',
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
export class SubmittedQuotationsComponent {
  quotations = [
    {
      property: 'X',
      issueDate: '23 July 2025',
      expiryDate: '30 July 2025',
      quoteNo: 'AX213HJ',
      amount: 'R2 500',
      status: 'pending'
    },
    {
      property: 'Y',
      issueDate: '23 July 2025',
      expiryDate: '30 July 2025',
      quoteNo: 'AX213HJ',
      amount: 'R2 500',
      status: 'successful'
    },
    {
      property: 'Z',
      issueDate: '23 July 2025',
      expiryDate: '30 July 2025',
      quoteNo: 'AX213HJ',
      amount: 'R2 500', 
      status: 'unsuccessful'
    }
  ];
}
