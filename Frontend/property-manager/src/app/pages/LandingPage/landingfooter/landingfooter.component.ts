import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-landingfooter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landingfooter.component.html',
  styleUrls: ['./landingfooter.component.scss']
})
export class LandingfooterComponent {
  currentYear = new Date().getFullYear();
}
