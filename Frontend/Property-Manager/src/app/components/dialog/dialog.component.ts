import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog',
  imports: [],
  template: ``,
  styles: ``
})
export abstract class DialogComponent {
  displayDialog = false;

  openDialog(): void{
    this.displayDialog = true;
  }

  closeDialog(): void{
    this.displayDialog = false;
  }
}
