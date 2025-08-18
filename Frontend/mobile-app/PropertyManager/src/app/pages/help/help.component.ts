import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonContent, 
  IonButton, 
  IonIcon, 
  IonModal, 
  IonButtons,
  IonAccordion,
  IonAccordionGroup,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { mailOutline, callOutline, timeOutline } from 'ionicons/icons';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { TabComponent } from 'src/app/components/tab/tab.component';

@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.scss'],
  imports: [
    CommonModule,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonIcon,
    IonModal,
    IonButtons,
    IonAccordion,
    IonAccordionGroup,
    IonItem,
    IonLabel,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    HeaderComponent,
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
export class HelpPage {
  faqItems = [
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

  showFaqs = false;
 constructor() {
    addIcons({
        mailOutline, callOutline, timeOutline
     }); }

  toggleFaqs() {
    this.showFaqs = !this.showFaqs;
  }
}