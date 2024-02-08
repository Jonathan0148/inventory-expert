import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { environment } from '../../../environments/environment.prod';
export interface ResModel{
  type: string;
  data: any;
}
@Injectable({ providedIn: 'root' })

export class CrudServices {
  @Output() requestEvent = new EventEmitter<string | any>();
  private serverURL: string = environment.serverUrl;

  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  /*************************** Servicios CRUD para la BD ***************************/

  // Solicitud GET
  getRequest(path:string): Observable<string> {
    return this.http.get<string>(this.serverURL + path, this.httpOptions);
  }

  // Solicitud POST
  postRequest(path:string, info:any): Observable<string> {
    return this.http.post<string>(this.serverURL + path, info, this.httpOptions);
  }

  // Solicitud POST
  postDataRequest(path:string, body:FormData): Observable<any> {
    return this.http.post<string>(this.serverURL + path, body);
  }
  

  // Solicitud PUT
  putRequest(path:string, info:any): Observable<string> {
    return this.http.put<string>(this.serverURL + path, info, this.httpOptions);
  }
  

  // Solicitud DELETE
  deleteRequest(path:string): Observable<string> {
    return this.http.delete<string>(this.serverURL + path, this.httpOptions);
  }

}
