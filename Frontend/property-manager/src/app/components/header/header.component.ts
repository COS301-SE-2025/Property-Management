import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { AuthService } from 'shared';
import { NavigationEnd, Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { filter } from 'rxjs';
import { BreadCrumbService } from '../breadcrumb/breadcrumb.service';
import { trigger, transition, style, animate, state } from '@angular/animations';

type UserType = 'contractor' | 'bodyCorporate' | 'trustee' | null;

interface NavLink {
  label: string;
  route: string;
  show: boolean;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, BreadcrumbModule, RouterModule],
  templateUrl: `./header.component.html`,
  styles: ``,
  animations: [
    trigger('slideToggle', [
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      state('inactive', style({
        transform: 'translateX(100%)',
        opacity: 0
      })),
      transition('inactive => active', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('300ms ease-out')
      ]),
      transition('active => inactive', [
        animate('300ms ease-in', style({ transform: 'translateX(100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class HeaderComponent {

  public dropDownProfileOpen = false;
  public dropDownSettingsOpen = false;
  public isDarkMode = false;
  public items: MenuItem[] = [];
  public isContractor = false; 
  public isBodyCorporate = false; 

  @ViewChild('profileDropDown') profileDropDown!: ElementRef;
  @ViewChild('settingsDropDown') settingsDropDown!: ElementRef;

  private routeMap: Record<string, Record<string, MenuItem[]>> = {
  'bodyCorporate': {
    '/bodyCoporate/contractors': [
      { label: 'Trusted Contractors', route: '/bodyCoporate/contractors' }
    ],
    '/bodyCoporate/publicContractors': [
      { label: 'Public Contractors', route: '/bodyCoporate/publicContractors' }
    ],
    '/contractorDetails': [
      { label: 'Public Contractors', route: '/bodyCoporate/publicContractors' },
      { label: 'Contractor Details', route: '/contractorDetails' }
    ],
    '/viewHouse:/houseId': [
      { label: 'View House', route: null}
    ],
    '/manageBudget': [
      { label: 'View House', route: '/viewHouse' },
      { label: 'Manage Budget', route: '/manageBudget' }
    ],
    '/create-property': [
      { label: 'Create Property', route: '/create-property' }
    ]
  },
  'trustee': {
    '/viewHouse': [
      { label: 'View House', route: '/viewHouse' }
    ],
    '/manageBudget': [
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

  userType: UserType = null;
  navLinks: NavLink[] = [];

  constructor(private authService: AuthService, private router: Router, private elementRef: ElementRef, private breadCrumbService: BreadCrumbService){
    const saved = localStorage.getItem('darkMode');

    this.userType = this.authService.getUserType() as UserType;
    this.setNavLinks();

    if(saved !== null)
    {
      this.isDarkMode = saved === 'true';
    }
    else
    {
      this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    this.applyDarkMode();

    this.breadCrumbService.breadCrumbs.subscribe(bread => {
      if(bread)
      {
        this.items = bread;
      }
      else
      {
        this.updateBreadcrumbs(this.router.url);
      }
    })


    this.isContractor = this.userType === 'contractor';
    this.isBodyCorporate = this.userType === 'bodyCorporate';

    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      this.updateBreadcrumbs(event.url);
    });
  }

  dropDownProfile()
  {
    this.dropDownSettingsOpen = false;

    setTimeout(() => {
      this.dropDownProfileOpen = !this.dropDownProfileOpen;
    }, 0);
  }
  dropDownSettings()
  {
    console.log("opening settings");
    this.dropDownProfileOpen = false;

    setTimeout(() => {
      this.dropDownSettingsOpen = !this.dropDownSettingsOpen;
    }, 0);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent)
  {
    const target = event.target as HTMLElement;

    const clickedInside = this.elementRef.nativeElement.contains(target);
    if(!clickedInside)
    {
      this.dropDownProfileOpen = false;
      this.dropDownSettingsOpen = false;
    }
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
      root.classList.add('dark');
    }
    else
    {
      root.classList.remove('dark-theme');
      root.classList.remove('dark');
    }
  }
  private updateBreadcrumbs(url: string): void {
    if (!this.userType) return;

    const baseUrl = url.split('?')[0].split('#')[0];
    const pathParts = baseUrl.split('/').filter(part => part);

    const houseId = pathParts[0] === 'viewHouse' || pathParts[0] === 'manageBudget' ? pathParts[1] : null;

    const userRoutes = this.routeMap[this.userType];
    if (!userRoutes) return;

    if (userRoutes[baseUrl]) {
      this.items = [...userRoutes[baseUrl]];
      return;
    }

    if(pathParts[0] === 'viewHouse' && houseId)
    {
      this.items = [
        { label: 'View House', route: `/viewHouse/${houseId}` }
      ];
      return;
    }

    if(pathParts[0] === 'manageBudget' && houseId)
    {
      this.items = [
        { label: 'View House', route: `/viewHouse/${houseId}` },
        { label: 'Manage Budget', route: null },
      ];
      return;
    }
    if(pathParts[0] === 'contractorDetails' && pathParts.length >= 3)
    {
      const contractorType = pathParts[2];
      if(this.userType === 'bodyCorporate')
      {
        if(contractorType === 'public')
        {
          this.items = [
            { label: 'Public Contractors', route: '/bodyCoporate/publicContractors' },
            { label: 'Contractor Details', route: null }
          ];
        }
        else if(contractorType === 'trusted')
        {
          this.items = [
            { label: 'Trusted Contractors', route: '/bodyCoporate/contractors' },
            { label: 'Contractor Details', route: null }
          ];
        }
        return;
      }
    }
  }

  setNavLinks() {
    let homeRoute = '/home';
    if (this.userType === 'contractor') homeRoute = '/contractorHome';
    if (this.userType === 'bodyCorporate') homeRoute = '/bodyCoporate';

    this.navLinks = [
      { label: 'Home', route: homeRoute, show: true },
      { label: 'Properties', route: '/home', show: this.userType === 'bodyCorporate'},
      { label: 'Voting', route:'/voting', show: this.userType === 'bodyCorporate' || this.userType === 'trustee' },
      { label: 'Contractors', route: '/bodyCoporate/contractors', show: this.userType === 'bodyCorporate' },
      { label: 'My Profile', route: '/contractor-prof', show: this.userType === 'contractor' },
    ];
  }
}