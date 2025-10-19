import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, NotificationsComponent],
  template: `
    <ng-container *ngIf="!hideHeader">
        <app-header style="display: block !important;"></app-header>
        <app-notifications></app-notifications>
    </ng-container>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  hideHeader = false;
  private noHeaderRoutes = ['/login', '/register', '/landingPage', '/registerHub', '/contractorRegister', '/register-owner', '/register-body-corporate', '/verifyEmail', '/reset-password', '/landing-header', '/landing-footer', '/our-team'];

  constructor(private router: Router) {}

  ngOnInit() {
    // console.log('AppComponent initialized');
    this.updateHeaderVisibility(this.router.url);

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.updateHeaderVisibility(event.urlAfterRedirects);
    });
  }

  private updateHeaderVisibility(url: string) {
    const baseUrl = url.split('?')[0].split('#')[0];
    // console.log('Current route:', baseUrl, 'hideHeader before:', this.hideHeader);
    this.hideHeader = this.noHeaderRoutes.some(route => baseUrl === route || baseUrl.startsWith(route + '/'));
    // console.log('Updated hideHeader:', this.hideHeader, 'for route:', baseUrl);
  }
}