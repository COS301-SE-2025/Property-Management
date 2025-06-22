import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";

@Component({
    selector: 'app-help-page',
    imports: [ ButtonModule, RouterLink, HeaderComponent ],
    standalone: true,
    templateUrl: `./help.component.html`,
    styles: ``,
})

export class HelpComponent  {
   
}
