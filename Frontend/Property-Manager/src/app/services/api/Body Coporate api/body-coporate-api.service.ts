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

  private url = '/api';

  constructor(private http: HttpClient) { }

  getBuildingsLinkedtoBC(bcId: string): Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.url}/buildings`).pipe(
      map(properties => { 
        return properties.filter(property => {
          return property.coporateUuid === bcId;
        })
      })
    );
  }
  getPendingTasks(buildingId: string): Observable<MaintenanceTask[]>
  {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`).pipe(
      map(tasks => {
        return tasks.filter(task => {
          return task.b_uuid === buildingId && task.status.includes('pending')
        });
      })
    );
  }
  getBodyCoporate(bcId: string): Observable<BodyCoporate>
  {
    return this.http.get<BodyCoporate>(`${this.url}/body-corporates/${bcId}`);
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

    return response;
  }
  getAllPublicContractors(coporateId: string): Observable<ContractorDetails[]>
  {
    return this.http.get<ContractorDetails[]>(`${this.url}/contractor`).pipe(
      map(contractor => {
        return contractor.filter(c => {
          return c.corporate_uuid !== coporateId
        });
      })
    );
  }
  getTrustedContractors(coporateId: string): Observable<ContractorDetails[]>
  {
    return this.http.get<ContractorDetails[]>(`${this.url}/contractor`).pipe(
      map(contractor => {
        console.log(contractor);
        return contractor.filter(c => {
          return c.corporate_uuid === coporateId
        });
      })
    );
  }
  updateContractorDetails(contractor: ContractorDetails): Observable<ContractorDetails>
  {
    let imageId: string | undefined;
    if(contractor.image)
    {
      const parts = contractor.image.split('uploads/');
      if(parts.length > 1)
      {
        imageId = parts[1].split('?')[0].split('-').slice(0, 5).join('-');
      }
    }
    contractor.image = imageId;

    return this.http.put<ContractorDetails>(`${this.url}/contractor/${contractor.uuid}`, contractor);
  }
}