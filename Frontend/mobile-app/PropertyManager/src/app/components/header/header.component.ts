import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonBreadcrumb, IonBreadcrumbs  } from "@ionic/angular/standalone";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: ``,
  imports: [IonBreadcrumb, IonBreadcrumbs, CommonModule],
})
export class HeaderComponent implements OnInit{

  houseId: string | null = null;
  currentUrl = '';

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
      this.route.params.subscribe(params => {
        this.houseId = params['houseId'] || null;
      });

      this.currentUrl = this.router.url;
  }

  isViewHouse(): boolean{
    return this.currentUrl.includes('view-house');
  }

  isManageBudget(): boolean{
    return this.currentUrl.includes('manage-budget');
  }
}
