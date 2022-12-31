import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../../models/user.model';
import { AuthTokenService } from '../../core/services/authentication/auth-token.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _userObj: IUser = { id: '', email: '', name: '', role: { roleName: '', roleDesc: '' } };
  private _user = new BehaviorSubject(this._userObj);
  get currentUser() {
    return this._user.asObservable();
  }
  constructor(private _authTokenService: AuthTokenService) { }

  public updateUser(user: IUser) {
    this._userObj = user;
    this._user.next(user)
  }
  public async getUser(): Promise<IUser> {
    return await this._authTokenService.getUserFromToken();
  }
}
