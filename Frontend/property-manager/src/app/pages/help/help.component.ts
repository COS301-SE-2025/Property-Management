import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { AccordionModule } from 'primeng/accordion';
import { MenuItem } from 'primeng/api';

import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
    selector: 'app-help-page',
    imports: [ ButtonModule, RouterLink, HeaderComponent, CommonModule,AccordionModule ],
    standalone: true,
    templateUrl: `./help.component.html`,
    styles: ``,
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

export class HelpComponent  {
   faqItems: MenuItem[] = [
    {
      header: 'How do I reset my password?',
      content: 'Click on the "Reset Password" option and follow the instructions sent to your email.'
    },
    {
      header: 'How can I contact support?',
      content: 'You can call, email, or visit during our business hours as shown in the contact section.'
    },
    {
      header: 'Where can I find the user manual?',
      content: 'Click on the "User Manual" option to access the complete documentation.'
    },
    {
      header: 'How do I register as a contractor?',
      content: 'Go to the registration page and select "Register as Contractor" option.'
    }
  ];

  showFaqs: boolean = false;

  toggleFaqs() {
    this.showFaqs = !this.showFaqs;
  }
}
