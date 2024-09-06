import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';

var apiUrl = "https://localhost:44370/";

// var apiUrl = "http://192.168.10.10:105";
//var apiUrl  = "assets/features.json" // Need to change


@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  static getAllFeature() {
    throw new Error('Method not implemented.');
  }

  constructor(private webApiService: WebApiService, private httpClient: HttpClient) { }

  public getAllFeature(): Observable<any> {
    return this.webApiService.get(apiUrl);
  }

  public deleteFeatureById(model: any): Observable<any> {
    return this.webApiService.post(apiUrl + '?id=' + model, "");
  }


  public getFeatureById(id: any): Observable<any> {
    return this.webApiService.get(apiUrl + '?id=' + id);
  }

  public saveFeature(model: any): Observable<any> {
    return this.webApiService.post(apiUrl, model);
  }
  
}
