import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  urldistrict = 'https://api.covid19india.org/v4/data.json';
  temproary:any;
  urlComplete='https://api.covid19india.org/data.json';
  constructor( private httpClient: HttpClient) { }

  getStateWiseData(){
    return this.httpClient.get(this.urlComplete).pipe(map((data)=>data));;
  }
  urlstate='https://api.covid19india.org/state_district_wise.json';
  
  getDistrictWiseData(){

    // console.log(tn1.statecode==="TN");
    return this.httpClient.get(this.urlstate).pipe(map((data)=>data));
  }

  getTestData(){
    
    return this.httpClient.get(this.urldistrict).pipe(map((data)=>data));;
  }
}
