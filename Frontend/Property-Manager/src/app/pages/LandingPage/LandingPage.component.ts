import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
@Component({
    selector: 'app-landingpage',
    imports: [CardModule, ButtonModule, RouterLink, HeaderComponent],
    standalone: true,
    templateUrl: `./Landingpage.component.html`,
    styles: ``,
})

export class LandingPageComponent  {
   
}
