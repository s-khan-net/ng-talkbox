import { Injectable } from '@angular/core';
import { APP_CONST } from 'src/app/shared/contants';
import { IUser } from '../../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {

  constructor() { }

  public getUserFromToken(authToken?: string): Promise<IUser> {
    let token: any;
    if (!authToken)
      token = localStorage.getItem(APP_CONST.ACCESS_TOKEN);
    else
      token = authToken
    const p = new Promise<IUser>((resolve, reject) => {
      if (!!token) {
        let payload = this.parseJwt(token);
        //TODO
        //check for time in payload
        let u: IUser = {
          id: payload['_id'],
          email: payload['email'],
          name: payload['name'],
          avatar: '',
          role: payload['role'] || undefined,
        }
        resolve(u);
      }
      else {
        reject('Could not get user from token')
      }
    })
    return p;
  }

  private parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  public getJwtToken(): string | null {
    return localStorage.getItem(APP_CONST.ACCESS_TOKEN);
  }

  public putJwtToken(token: string): void {
    localStorage.setItem(APP_CONST.ACCESS_TOKEN, token)
  }

  public removeJwtToken(): void {
    localStorage.removeItem(APP_CONST.ACCESS_TOKEN);
  }
}
