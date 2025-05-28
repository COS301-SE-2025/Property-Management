import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RouterLink} from '@angular/router';
import { HeaderComponent } from "../../components/header/header.component";
@Component({
    selector: 'app-contractor-home',
    imports: [CardModule, ButtonModule, RouterLink, HeaderComponent],
    standalone: true,
    template: `
  
  <app-header/>
  
    <div class="min-h-screen bg-white relative p-4">
  

  <div class="p-4 text-center">
  <img src="assets/images/logo.png" alt="Centered Image" class="mx-auto w-32 h-auto" />
  <p class="mt-2 font-bold text-xl text-black">Property Manager</p>
</div>


<div class="flex justify-center p-4">
  <div class="relative w-64">
    <img 
      src="assets/icons/search.svg" 
      alt="Search Icon" 
      class="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
    />
    <input 
      type="text" 
      placeholder="" 
      class="w-full h-10 pl-10 pr-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-300 text-black" 
    />
  </div>
</div>
<div class="flex flex-wrap gap-8 pl-8 pt-8 pb-10 justify-center">
<a [routerLink]="['/quotation']" class="block">
  <p-card [style]="{ height: '16rem', width: '13rem', overflow: 'hidden', backgroundColor: 'white' }">
    <ng-template #header>
      <img alt="Card" class="w-full h-40" src="assets/images/house1.jpg" />
    </ng-template>
    <ng-template #title>
      <span class="text-black">Propect A</span>
    </ng-template>
    <ng-template #subtitle>
      <span class="text-black">Fix burst pipe</span>
    </ng-template>
    
  </p-card>
</a>
<a [routerLink]="['/quotation']" class="block">
  <p-card [style]="{ height: '16rem', width: '13rem', overflow: 'hidden', backgroundColor: 'white' }">
    <ng-template #header>
      <img alt="Card" class="w-full h-40" src="assets/images/house2.jpg" />
    </ng-template>
    <ng-template #title>
      <span class="text-black">Project B</span>
    </ng-template>
    <ng-template #subtitle>
      <span class="text-black">Fix broken toilet</span>
    </ng-template>
  </p-card>
</a>
<a [routerLink]="['/quotation']" class="block">
  <p-card [style]="{ height: '16rem', width: '13rem', overflow: 'hidden', backgroundColor: 'white' }">
    <ng-template #header>
      <img alt="Card" class="w-full h-40" src="assets/images/house3.jpg" />
    </ng-template>
    <ng-template #title>
      <span class="text-black">Project c</span>
    </ng-template>
    <ng-template #subtitle>
      <span class="text-black"> Add landscapping</span>
    </ng-template>
  </p-card>
</a>
</div>
<div class="h-1.5 bg-yellow-500 w-full "></div>
</div>
  `,
    styles: ``,
})

export class ContractorHomeComponent  {
   
}
