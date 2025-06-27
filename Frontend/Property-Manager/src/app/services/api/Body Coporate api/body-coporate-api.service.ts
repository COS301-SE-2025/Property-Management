import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Property } from '../../../models/property.model';
import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { ReserveFund } from '../../../models/reserveFund.model';
import { BodyCoporate } from '../../../models/bodyCoporate.model';
import { ContractorDetails } from '../../../models/contractorDetails.model';

@Injectable({
  providedIn: 'root'
})
export class BodyCoporateApiService {

  private tempBcId = '9ada9a7c-2bd6-4106-bde5-7fa76f218093';
  private url = '/api';

  constructor(private http: HttpClient) { }

  getBuildingsLinkedtoBC(): Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.url}/buildings`).pipe(
      map(properties => { 
        console.log(properties);
        return properties.filter(property => {
          return property.coporateUuid === this.tempBcId;
        })
      })
    );
  }
  getPendingTasks(buildingId: string): Observable<MaintenanceTask[]>
  {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`).pipe(
      map(tasks => {
        console.log(tasks);
        return tasks.filter(task => {
          return task.b_uuid === buildingId && task.status.includes('pending')
        });
      })
    );
  }
  getBodyCoporate(): Observable<BodyCoporate>
  {
    return this.http.get<BodyCoporate>(`${this.url}/body-corporates/${this.tempBcId}`);
  }
  getAndCalculateReserveFund(bc: BodyCoporate, floorArea: number, unitName: string): ReserveFund
  {
    const contri = (floorArea*bc.contributionPerSqm);
    const quota = (contri/floorArea)/10;

    const response: ReserveFund = {
      unitName: unitName,
      floorArea: floorArea,
      contributionPerSqm: bc.contributionPerSqm,
      annualContribution: contri,
      partipationQuota: quota
    };
    console.log(response);

    return response;
  }
  //Get contractor ids from buildings then get actual contractors
  // getContractorsLinkedToBuilding(buildingId: string, contractorId: string): String[]
  // { 
  //   let contractors: string[] = [];
  //   this.http.get<Property[]>(`$${this.url}/buildings/${buildingId}`).pipe(
  //     map((buildings) => {
  //       console.log(buildings);
  //       buildings.forEach((b) => {
  //         contractors.push(b.primaryContractors);
  //       });
  //     })
  //   );

  //   return contractors;
  // }
  // getContractors(): Observable<ContractorDetails>
  // {

  // }
  getAllPublicContractors(coporateId: string): Observable<ContractorDetails[]>
  {
    return this.http.get<ContractorDetails[]>(`${this.url}/api/contractors`).pipe(
      map(contractor => {
        return contractor.filter(c => {
          return c.coporateUuid !== coporateId
        });
      })
    );
  }
}