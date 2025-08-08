import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Property } from '../../../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class BuildingApiService {

  private url = '/api';

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

    return this.http.post<Property>(`${this.url}/buildings`, house);
  }

  getAllBuildings(): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.url}/buildings`);
  }

  getBuildingById(propertyId: string): Observable<Property> {
    return this.http.get<Property>(`${this.url}/buildings/${propertyId}`);
  }

  updateBuilding(propertyId: string, name: string, image: string, bcId: string): Observable<Property> {
    const updatedProperty = {
      name: name,
      propertyImage: image,
      coporateUuid: bcId
    };

    return this.http.put<Property>(`${this.url}/buildings/${propertyId}`, updatedProperty);
  }

  deleteBuilding(propertyId: string): Observable<Property> {
    return this.http.delete<Property>(`${this.url}/buildings/${propertyId}`);
  }

  getBuildingsByTrustee(trusteeId: string): Observable<{ trusteeUuid: string; buildings: Property[] }> {
    return this.http.get<{ trusteeUuid: string; buildings: Property[] }>(`${this.url}/buildings/trustee/${trusteeId}`);
  }

  searchBuildingsByName(buildingName: string): Observable<Property[]> {
    const encodedName = encodeURIComponent(buildingName);
    return this.http.get<Property[]>(`${this.url}/buildings/search?name=${encodedName}`);
  }

  getBuildingsByType(buildingType: string): Observable<Property[]> {
    return this.http.get<Property[]>(`${this.url}/buildings/type/${buildingType}`);
  }
}
