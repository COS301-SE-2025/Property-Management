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

  createBuilding(name: string, address: string, type: string, propertyValue: number, primaryContractors: number[], latestInspectionDate: string, propertyImage:string, trusteeId: string): Observable<Property>
  {
    //Ignore complex name in documentation
    //Need to add a area of property field
    //To get the property image id you need to use the image_meta endpoint first
    const house = {
      name: name,
      address: address,
      type: type,
      propertyValue: propertyValue,
      primaryContractors: primaryContractors,
      latestInspectionDate: latestInspectionDate,
      trustees: trusteeId,
      propertyImage: propertyImage
    }

    return this.http.post<Property>(`${this.url}/buildings`, house);
  }

  getAllBuildings(): Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.url}/buildings`);
  }

  getBuildingById(propertyId: string): Observable<Property>
  {
    return this.http.get<Property>(`${this.url}/buildings/${propertyId}`);
  }

  updateBuilding(property: Property, propertyId: string, trusteeId: string): Observable<Property>
  {
    const updatedProperty ={
      name: property.name,
      address: property.address,
      type: property.type,
      propertyValue: property.propertyValue,
      primaryContractors: property.primaryContractors,
      latestInspectionDate: property.latestInspectionDate,
      trusteeUuid: trusteeId,
      propertyImageId: property.propertyImage
    }

    return this.http.put<Property>(`${this.url}/buildings/${propertyId}`, updatedProperty);
  }

  deleteBuiling(propertyId: string) : Observable<Property>
  {
    return this.http.delete<Property>(`${this.url}/buildings/${propertyId}`);
  }

  getBuildingsByTrustee(trusteeId: string): Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.url}/buildings/trustee/${trusteeId}`);
  }

  searchBuildingsByName(buildingName: string): Observable<Property[]>
  {
    const encodedName = encodeURIComponent(buildingName);
    return this.http.get<Property[]>(`${this.url}/buildings/search?name=${encodedName}`);
  }

  getBuildingsByType(buildingType:string): Observable<Property[]>
  {
    return this.http.get<Property[]>(`${this.url}/buildings/type/${buildingType}`);
  }
}
