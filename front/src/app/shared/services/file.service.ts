import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})

export class FilesService {

  private serverUrl = environment.serverUrl;
  public maxSize = 1000000;

  constructor(private http: HttpClient) { }

  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('photo', file);

    const req = new HttpRequest('POST', `${this.serverUrl}/file/upload`, formData, {
      //reportProgress: true,
      // responseType: 'json'
    });

    return this.http.request(req);
  }

  loadProducts(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', `${this.serverUrl}/products/importExcel`, formData, {
      //reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }
  
  exportFile(path:string,filename:string) {
    const token: string = sessionStorage.getItem('api_key');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get(`${this.serverUrl}${path}`, {headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            const dataType = response.type;
            const binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }

  exportFilePOST(path:string,body:any | Array<any>,filename:string) {
    const token: string = sessionStorage.getItem('api_key');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post(`${this.serverUrl}${path}`, body, {headers, responseType: 'blob' as 'json'}).subscribe(
        (response: any) =>{
            const dataType = response.type;
            const binaryData = [];
            binaryData.push(response);
            let downloadLink = document.createElement('a');
            downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, {type: dataType}));
            downloadLink.setAttribute('download', filename);
            document.body.appendChild(downloadLink);
            downloadLink.click();
        }
    )
  }
}
