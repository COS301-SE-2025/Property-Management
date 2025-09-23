import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable } from 'rxjs';
import { Property } from '../../../models/property.model';
import { MaintenanceTask } from '../../../models/maintenanceTask.model';
import { ReserveFund } from '../../../models/reserveFund.model';
import { BodyCoporate } from '../../../models/bodyCoporate.model';
import { ContractorDetails } from '../../../models/contractorDetails.model';
import { environmentMobile } from '../../../environment';
import {of} from 'rxjs';
import {catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BodyCoporateApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;

  constructor(private http: HttpClient) { }

  getBuildingsLinkedtoBC(bcId: string): Observable<Property[]>
  {
    return this.http.get<{ buildings: Property[] }>(`${this.url}/buildings/corporate/${bcId}`).pipe(
      map(response => response.buildings)
    );
  }
  getPendingTasks(buildingId: string): Observable<MaintenanceTask[]>
  {
    return this.http.get<MaintenanceTask[]>(`${this.url}/maintenance`).pipe(
      map(tasks => {
        return tasks.filter(task => {
          return (task.buuid === buildingId)
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
  private getAllContractors(): Observable<ContractorDetails[]>
  {
    return this.http.get<ContractorDetails[]>(`${this.url}/contractor`);
  }
  getTrustedContractors(coporateId: string): Observable<string[]>
  {
    return this.http.get<string[]>(`${this.url}/contractorCorporate/contractors/${coporateId}`);
  }
  getAllPublicContractors(corporateId: string): Observable<ContractorDetails[]> {
    return forkJoin({
      all: this.getAllContractors().pipe(
        catchError(err => {
          console.error('Failed to get all contractors', err);
          return of([]); // return empty array if this request fails
        })
      ),
      trusted: this.getTrustedContractors(corporateId).pipe(
        catchError(err => {
          console.error('Failed to get trusted contractors', err);
          return of([]); // return empty array if this request fails
        })
      )
    }).pipe(
      map(({ all, trusted }: { all: ContractorDetails[]; trusted: string[] }) => all.filter(contractor => !trusted.includes(contractor.uuid)))
    );
  }
  updateContractorDetails(contractor: ContractorDetails): Observable<ContractorDetails>
  {
    let imageId: string | undefined;
    if(contractor.img)
    {
      const parts = contractor.img.split('uploads/');
      if(parts.length > 1)
      {
        imageId = parts[1].split('?')[0].split('-').slice(0, 5).join('-');
      }
    }
    contractor.img = imageId;

    return this.http.put<ContractorDetails>(`${this.url}/contractor/${contractor.uuid}`, contractor);
  }
  updateContribution(bcId: string, contribution: number)
  {
    return this.http.put(`${this.url}/body-corporates/${bcId}`, { contributionPerSqm: contribution });
  }
  makeContractorTrusted(contractorId: string, bcId: string)
  {
    const req = { 
      contractorUuid: contractorId,
      bodyCorporateUuid: bcId
    };

    return this.http.post(`${this.url}/contractorCorporate`, req);
  }
}