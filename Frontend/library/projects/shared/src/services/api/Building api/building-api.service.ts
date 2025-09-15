import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../../../models/property.model';
import { environmentMobile } from '../../../environment';

@Injectable({
  providedIn: 'root'
})
export class BuildingApiService {

  // private url = '/api';
  private url = environmentMobile.apiUrl;

  constructor(private http: HttpClient) { }

  createBuilding(
    name: string,
    address: string,
    type: string,
    propertyValue: number,
    primaryContractors: number[],
    latestInspectionDate: string,
    propertyImage: string,
    trusteeId: string,
    area: number
  ): Observable<Property> {
    const house = {
      name: name,
      address: address,
      type: type,
      propertyValue: propertyValue,
      primaryContractors: primaryContractors,
      latestInspectionDate: latestInspectionDate,
      trustees: trusteeId,
      propertyImage: propertyImage,
      area: area
    };

    return this.http.post<Property>(`${this.url}/buildings`, house,
    { withCredentials: true });
  }

  getAllBuildings(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.url}/buildings`,
    { withCredentials: true });
  }

  getBuildingById(propertyId: string): Observable<Property> {
    return this.http.get<Property>(`${this.url}/buildings/${propertyId}`,
    { withCredentials: true });
  }

  updateBuilding(propertyId: string, name: string, image: string, bcId: string): Observable<Property> {

    let updatedProperty = {};
    if(image === '00000000-0000-0000-0000-000000000000')
    {
      if(bcId === '' || bcId === null)
      {
        updatedProperty = {
          name: name
        }
      }
      else
      {
        updatedProperty = { 
          name: name,
          coporateUuid: bcId
        };
      }
    }
    else
    {
      if(bcId === null || bcId === '')
      {
        updatedProperty = {
          name: name,
          propertyImage: image
        }
      }
      else
      {
        updatedProperty = {
          name: name,
          propertyImage: image,
          coporateUuid: bcId
        };
      }
    }

    return this.http.put<Property>(`${this.url}/buildings/${propertyId}`, updatedProperty,
    { withCredentials: true });
  }

  deleteBuilding(propertyId: string): Observable<Property> {
    return this.http.delete<Property>(`${this.url}/buildings/${propertyId}`,
    { withCredentials: true });
  }

  getBuildingsByTrustee(trusteeId: string): Observable<{ trusteeUuid: string; buildings: Property[] }> {
    return this.http.get<{ trusteeUuid: string; buildings: Property[] }>(`${this.url}/buildings/trustee/${trusteeId}`,
    { withCredentials: true });
  }

  searchBuildingsByName(buildingName: string): Observable<Property[]> {
    const encodedName = encodeURIComponent(buildingName);
    return this.http.get<Property[]>(`${this.url}/buildings/search?name=${encodedName}`,
    { withCredentials: true });
  }

  getBuildingsByType(buildingType: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.url}/buildings/type/${buildingType}`,
    { withCredentials: true });
  }

  removeBuildingFromBc(buildingId: string)
  {
    return this.http.put(`${this.url}/buildings/${buildingId}/revoke-corporate`, {});
  }
}
