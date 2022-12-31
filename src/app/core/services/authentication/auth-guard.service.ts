import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/models/user.model';
import { AuthTokenService } from './auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private _authTokerService:AuthTokenService, private _router: Router) { }
  
  public async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    
    return new Promise<boolean>(async (resolve, reject) =>{
      const user = await this._authTokerService.getUserFromToken();
      console.log('authguard -> user->', user)
      if(user)
        resolve(true);
      else
        this._router.navigateByUrl('login')
    })
  }
}
