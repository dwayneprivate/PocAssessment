import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": '*'
  })
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public http: HttpClient) { }

  apiURL: string = "http://assignmentapi.eu-west-2.elasticbeanstalk.com/api"

  //Employee data
  public RetrieveEmployees() {
    return this.http.get(this.apiURL + '/Employee/RetrieveEmployees')
  }

  //Retrieve tree view structure
  public RetrieveTreeView() {
    return this.http.get(this.apiURL + '/Employee/RetrieveTree')
  }
}
