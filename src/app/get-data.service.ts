import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(private httpClient: HttpClient) { }
  
  // getting the data from api call for the dashborad
  getOttxperiencedata(){
    return this.httpClient.get('https://outtvapp.ottxperience.com/Backend.svc/getallfilteredmetadata');
  }
}
