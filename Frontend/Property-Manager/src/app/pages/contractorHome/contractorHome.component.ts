import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
import { CommonModule } from '@angular/common';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger
} from '@angular/animations';

@Component({
    selector: 'app-contractor-home',
    imports: [CardModule, ButtonModule, RouterLink, HeaderComponent, CommonModule],
    standalone: true,
    templateUrl: `./contractorHome.component.html`,
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

export class ContractorHomeComponent  {
   
}
