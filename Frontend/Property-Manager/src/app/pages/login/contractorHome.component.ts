import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { RouterModule, Router } from '@angular/router'; 
import { Menu } from 'primeng/menu';
import { CommonModule } from '@angular/common';
@Component({
    selector: 'app-contractorHome',
    imports: [ButtonModule,DrawerModule,Menu,RouterModule,CommonModule],
    standalone: true,
    template: `
  <p-drawer [(visible)]="visible" [modal]="true" class="custom-yellow-drawer">
  <div class="h-full w-full bg-yellow-300 p-4">
 <div class="bg-yellow-300 p-2 rounded">
  <p-menu [model]="items" class="h-full w-full bg-yellow-300 text-black">
    <ng-template pTemplate="item" let-item>
      <ng-container *ngIf="item.route; else elseBlock">
        <a [routerLink]="item.route" class="p-menu-item-link flex items-center p-2 hover:bg-yellow-400 rounded">
          <span [class]="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </ng-container>
      <ng-template #elseBlock>
        <a [href]="item.url" class="p-menu-item-link flex items-center p-2 hover:bg-yellow-400 rounded">
          <span [class]="item.icon"></span>
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </ng-template>
    </ng-template>
  </p-menu>
</div>
  </div>
</p-drawer>
    <div class="min-h-screen bg-white flex flex-col items-start justify-start p-4">
  <p-button (click)="visible = true" icon="pi pi-arrow-right" label="Open" />
</div>
  `,
    styles: ``,
})

export class ContractorHomeComponent  {
   public visible: boolean = false;
   items: MenuItem[] | undefined;

    constructor(private router: Router) {}

    ngOnInit() {
        this.items = [
            {
                label: 'Navigate',
                items: [
                    {
                        label: 'Router Link',
                        icon: 'pi pi-palette',
                        route: '/guides/csslayer'
                    },
                    {
                        label: 'Programmatic',
                        icon: 'pi pi-link',
                        command: () => {
                            this.router.navigate(['/installation']);
                        }
                    },
                    {
                        label: 'External',
                        icon: 'pi pi-home',
                        url: 'https://angular.io//'
                    }
                ]
            }
        ];
    }
}
