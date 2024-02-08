import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../views/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthGuard implements CanActivate {
  
  constructor(
    private authSvc: AuthService,
  ) { }
  
  async canActivate():Promise<boolean> {
      
    return await this.authSvc.checkSession(true).then(a => {
      return true;
    }).catch(e => {
      return false;
    });
  }

}
