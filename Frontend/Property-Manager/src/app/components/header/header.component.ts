import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AuthService } from '../../services/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';

@Component({
  selector: 'app-header',
  imports: [CommonModule, BreadcrumbModule, RouterModule],
  templateUrl: `./header.component.html`,
  styles: ''
})
export class HeaderComponent {

  public dropDownProfileOpen = false;
  public dropDownSettingsOpen = false;
  public isDarkMode = false;
  public items: MenuItem[] = [];
  public isContractor = false; 

  public typeUser: string | null = null;
  private routeMap: Record<string, Record<string, MenuItem[]>> = {
  'bodyCorporate': {
    '/bodyCoporate': [
      { label: 'Body Corporate Dashboard', route: '/bodyCoporate' },
    ],
    '/home': [
      { label: 'Body Corporate Dashboard', route: '/bodyCoporate' },
      { label: 'Properties', route: '/home' },
    ],
    '/bodyCoporate/contractors': [
      { label: 'Body Corporate Dashboard', route: '/bodyCoporate' },
      { label: 'Body Corporate', route: '/bodyCoporate' },
      { label: 'Trusted Contractors', route: '/bodyCoporate/contractors' }
    ],
    '/bodyCoporate/publicContractors': [
      { label: 'Body Corporate Dashboard', route: '/bodyCoporate' },
      { label: 'Body Corporate', route: '/bodyCoporate' },
      { label: 'Public Contractors', route: '/bodyCoporate/publicContractors' }
    ],
    '/contractorDetails': [
      { label: 'Body Corporate Dashboard', route: '/bodyCoporate' },
      { label: 'Contractors', route: '/bodyCoporate/contractors' },
      { label: 'Contractor Details', route: '/contractorDetails' }
    ],
    '/viewHouse:/houseId': [
      { label: 'Home', route: '/home' },
      { label: 'View House', route: null}
    ],
    '/manageBudget': [
      { label: 'Home', route: '/home' },
      { label: 'View House', route: '/viewHouse' },
      { label: 'Manage Budget', route: '/manageBudget' }
    ],
    '/create-property': [
      { label: 'Home', route: '/home' },
      { label: 'Create Property', route: '/create-property' }
    ]
  },
  'trustee': {
    '/home': [
      { label: 'Home', route: '/home' }
    ],
    '/viewHouse': [
      { label: 'Home', route: '/home' },
      { label: 'View House', route: '/viewHouse' }
    ],
    '/manageBudget': [
      { label: 'Home', route: '/home' },
      { label: 'View House', route: '/viewHouse' },
      { label: 'Manage Budget', route: '/manageBudget' }
    ]
  },
  'contractor': {
    '/home': [
      { label: 'Home', route: '/contractorHome' }
    ],
    '/contractorHome': [
      { label: 'Home', route: '/contractorHome' },
      { label: 'Contractor Dashboard', route: '/contractorHome' }
    ],
    '/contractor-prof': [
      { label: 'Home', route: '/contractorHome' },
      { label: 'Profile', route: '/contractor-prof' }
    ],
    '/quotation': [
      { label: 'Home', route: '/contractorHome' },
      { label: 'Quotations', route: '/quotation' }
    ]
  }
  };

  constructor(private authService: AuthService, private router: Router){
    const saved = localStorage.getItem('darkMode');
    
    if(saved !== null)
    {
      this.isDarkMode = saved === 'true';
    }
    else
    {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyDarkMode();

    this.typeUser = localStorage.getItem('userType');

    this.isContractor = this.typeUser === 'contractor' ? true : false;

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.updateBreadcrumbs(event.url);
    });
  }

  dropDownProfile()
  {
    this.dropDownSettingsOpen = false;
    this.dropDownProfileOpen = !this.dropDownProfileOpen;
  }
  dropDownSettings()
  {
    this.dropDownProfileOpen = false;
    this.dropDownSettingsOpen = !this.dropDownSettingsOpen;
  }

  signOut()
  {
    this.dropDownProfileOpen = false;
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  toggleDarkMode()
  {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();

    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }
  private applyDarkMode()
  {
    const root = document.documentElement;
    if(this.isDarkMode)
    {
      root.classList.add('dark-theme');
    }
    else
    {
      root.classList.remove('dark-theme');
    }
  }
  private updateBreadcrumbs(url: string): void {
    if (!this.typeUser) return;

    const baseUrl = url.split('?')[0].split('#')[0];
    const pathParts = baseUrl.split('/').filter(part => part);

    const houseId = pathParts[0] === 'viewHouse' || pathParts[0] === 'manageBudget' ? pathParts[1] : null;

    const userRoutes = this.routeMap[this.typeUser];
    if (!userRoutes) return;

    if (userRoutes[baseUrl]) {
      this.items = [...userRoutes[baseUrl]];
      return;
    }

    if(pathParts[0] === 'viewHouse' && houseId)
    {
      this.items = [
        { label: 'Home', route: '/home' },
        { label: 'View House', route: `/viewHouse/${houseId}` }
      ];
      return;
    }

    if(pathParts[0] === 'manageBudget' && houseId)
    {
      this.items = [
        { label: 'Home', route: '/home' },
        { label: 'View House', route: `/viewHouse/${houseId}` },
        { label: 'Manage Budget', route: null },
      ];
      return;
    }

    this.items = [{ label: 'Home', route: '/home' }];
  }
}
