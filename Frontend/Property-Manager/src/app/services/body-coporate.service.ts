import { Injectable, signal } from '@angular/core';
import { MaintenanceTask } from '../models/maintenanceTask.model';
import { LifeCycleCost } from '../models/lifeCycleCost.model';
import { ContractorDetails } from '../models/contractorDetails.model';
import { ReserveFund } from '../models/reserveFund.model';
import { BodyCoporateApiService } from './api/Body Coporate api/body-coporate-api.service';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BodyCoporateService {

  //Mock data
  pendingTasks = signal<MaintenanceTask[]>([]);

  lifeCycleCosts = signal<LifeCycleCost[]>([
    {
      type: "Building",
      description: "Painting roof",
      condition: "Fixed 2024",
      timeFrame: "Year",
      estimatedBudget: 5000
    },
    {
      type: "Building",
      description: "Gutters and pipes",
      condition: "Leakages and loose pipes",
      timeFrame: "6-months",
      estimatedBudget: 10000
    },
    {
      type: "Community Facilities",
      description: "Garden equipment",
      condition: "Fair",
      timeFrame: "Year",
      estimatedBudget: 7000
    }
  ]);

  fundContribution = signal<ReserveFund[]>([]);

  // maintenanceGraph = signal<Graph>({
  //   labels: [2020, 2021, 2022, 2023, 2024, 2025],
  //   datasets:[
  //     {
  //       data: [130000, 110000, 85000, 160000, 220000, 180000],
  //       backgroundColor: 'rgba(255,227,114, 0.7)',
  //       borderColor: 'rgb(255,227,114)',
  //       borderWidth: 1
  //     }
  //   ]
  // });

  contractorDetails = signal<ContractorDetails[]>([
    // {
    //   contractorId: 1,
    //   name: "ABC plumbing",
    //   email: "abc_plumbing@gmail.com",
    //   phone: "012334455",
    //   apikey: "gtgrtghdrthbrdb",
    //   banned: false,
    //   images: ["assets/images/plumb.png"],
    //   address: "123 Example Street, Hatfield, Pretoria, South Africa, 01800",
    //   status: "Available for work",
    //   licenseNum: 13245345,
    //   descriptionAndSkills: "Everything plumbing",
    //   services: "Plumbing",
    //   certificates: "certificate.pdf",
    //   licenses: "license_plumb.pdf",
    //   projectHistory: "Worked on sinks, toilets, etc",
    //   projectHistoryProof: "History.pdf" 
    // },
    // {
    //   contractorId: 2,
    //   name: "DC Electrical",
    //   email: "dcElectric@example.com",
    //   phone: "0672122132",
    //   apikey: "gtgrtghdrthbrdb",
    //   banned: false,
    //   images: ["assets/images/electric.jpeg"],
    //   address: "123 Example Street, Hatfield, Pretoria, South Africa, 01800",
    //   status: "Available for work",
    //   licenseNum: 13245345,
    //   descriptionAndSkills: "Everything plumbing",
    //   services: "Plumbing",
    //   certificates: "certificate.pdf",
    //   licenses: "license_plumb.pdf",
    //   projectHistory: "Worked on sinks, toilets, etc",
    //   projectHistoryProof: "History.pdf" 
    // },
    // {
    //   contractorId: 3,
    //   name: "Home Builder",
    //   email: "HomeBuild@example.com",
    //   phone: "0332452348",
    //   apikey: "gtgrtghdrthbrdb",
    //   banned: false,
    //   images: ["assets/images/homeBuilder.png"],
    //   address: "123 Example Street, Hatfield, Pretoria, South Africa, 01800",
    //   status: "Available for work",
    //   licenseNum: 13245345,
    //   descriptionAndSkills: "Everything plumbing",
    //   services: "Plumbing",
    //   certificates: "certificate.pdf",
    //   licenses: "license_plumb.pdf",
    //   projectHistory: "Worked on sinks, toilets, etc",
    //   projectHistoryProof: "History.pdf" 
    // }
  ])
}
