import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingheaderComponent } from './landingheader/landingheader.component';
import { OurteamComponent } from './ourteam/ourteam.component';
import { LandingfooterComponent } from './landingfooter/landingfooter.component';

@Component({
  selector: 'app-landingpage',
  standalone: true,
  imports: [CommonModule, LandingheaderComponent, OurteamComponent, LandingfooterComponent],
  templateUrl: './Landingpage.component.html',
  styleUrls: ['./Landingpage.component.scss']
})
export class LandingPageComponent {
  currentSlide = 0;
  animationKey = 0; 
  
  slides = [
    { image: '/assets/images/landingpage/skyline.jpg', text: 'Inventory Tracking' },
    { image: '/assets/images/landingpage/contractoeTable.jpg', text: 'Contractor Sourcing' },
    { image: '/assets/images/landingpage/contractor.jpg', text: 'Budget Management' },
    { image: '/assets/images/landingpage/houseInside.jpg', text: 'Lifecycle Cost Analysis' }
  ];

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
      title: 'Mobile App',
      icon: '/assets/icons/mobile.svg',
      description: 'Mobile App for contractor quote submission and trustee notifications'
    }
  ];

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    this.animationKey++; 
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    this.animationKey++; 
  }
}