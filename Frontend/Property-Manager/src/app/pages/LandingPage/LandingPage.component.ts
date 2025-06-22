import { Component } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-landingpage',
    imports: [ ButtonModule, RouterLink, HeaderComponent, ],
    standalone: true,
    templateUrl: `./Landingpage.component.html`,
    styles: ``,
})

export class LandingPageComponent  {
   
}
