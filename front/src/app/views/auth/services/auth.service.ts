import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { CookieService } from 'ngx-cookie-service';
import { UserModel } from '../../../shared/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.serverUrl;
  token: string = '';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieSvc: CookieService
  ) { }

  public login(body: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, body)
  }

  public auditLogout(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/logout`)
  }

  public refreshToken() {
    return this.http.get(`${this.apiUrl}/auth/refresh`);
  }

  setterSettings = (res: any) => {
    this.cookieSvc.set('token',res.token, res.expires_in,'/');
    this.cookieSvc.set('modules',JSON.stringify(res.modules[0].modules), res.expires_in,'/');
  }

  currentUser = () => {
    // try {
    //   return (this.cookieService.get('user')) ? JSON.parse(this.cookieService.get('user')) : null;
    // } catch (e) {
    //   return null
    // }
  }

  public clear = () => {
    this.cookieSvc.delete('token', '/');
    this.cookieSvc.delete('modules', '/');
    // this.cookieService.delete('user', '/');
  }

  public logout = () => new Promise((resolve, reject) => {
    try {
      this.auditLogout()
      .subscribe(res => {
        this.clear();
        this.redirectLogin();
        resolve(true);
      });
    } catch (e) {
      reject(false);
    }
  });

  tokenUser() {
    return this.cookieSvc.get('token') ?? null
  }

  redirectLogin = () => {
    this.router.navigate(['/', 'iniciar-sesion']);
  }

  checkSession = (redirect = true) => {
    return new Promise((resolve, reject) => {
      if (this.cookieSvc.check('token')) {
        resolve(true);
      } else {
        redirect ? this.redirectLogin() : null;
        this.clear();
        reject(false);
      }
    }
    );
  };

}
