import { Component } from '@angular/core';
import { AuthService } from 'shared';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
  selector: 'app-landing-page',
  imports: [ButtonModule, CommonModule, RouterLink],
  standalone: true,
  templateUrl: `./Landingpage.component.html`,
  styles: [`
    .perspective-1000 {
      perspective: 1000px;
    }
    .preserve-3d {
      transform-style: preserve-3d;
    }
    .backface-hidden {
      backface-visibility: hidden;
    }
    @keyframes morph-1 {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(1.2) rotate(10deg); }
    }
    @keyframes morph-2 {
      0%, 100% { transform: scale(1) rotate(0deg); }
      50% { transform: scale(0.8) rotate(-20deg); }
    }
    .animate-morph-1 { animation: morph-1 8s ease-in-out infinite; }
    .animate-morph-2 { animation: morph-2 10s ease-in-out infinite alternate; }
  `],
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
export class LandingPageComponent {
  public dropDownOpen = false;
  public features = [
    {
      title: 'Contractor Management',
      icon: '/assets/icons/suitcase.svg',
      description: 'Streamline contractor hiring and performance tracking'
    },
    {
      title: 'Inventory Control',
      icon: '/assets/icons/tools.svg',
      description: 'Efficient management of property assets and supplies'
    },
    {
      title: 'Quote Management',
      icon: '/assets/icons/qoute.svg',
      description: 'Simplified quote collection and comparison process'
    },
    {
      title: 'Moble App',
      icon: '/assets/icons/mobile.svg',
      description: 'Moble App for contractor quote submition and trustee notififcations'
    }
  ];

  constructor(private authService: AuthService, private router: Router) {}

  dropDown() {
    this.dropDownOpen = !this.dropDownOpen;
  }

  signOut() {
    // Implementation remains the same
  }

  tilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = (x - centerX) / 10;
    const rotateX = (centerY - y) / 10;
    
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  resetTilt(event: MouseEvent) {
    const card = event.currentTarget as HTMLElement;
    card.style.transform = 'rotateX(0) rotateY(0)';
  }
}