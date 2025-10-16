import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-landingheader',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landingheader.component.html',
  styleUrls: ['./landingheader.component.scss']
})
export class LandingheaderComponent implements OnInit, OnDestroy {
  ngOnInit(): void {
    document.body.classList.add('hide-global-header');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('hide-global-header');
  }
}