import { Injectable } from '@angular/core';
import { IUser } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, of, Subject } from 'rxjs';
import { APP_CONST } from 'src/app/shared/contants';
import { AuthTokenService } from './auth-token.service';
import { UserService } from '../../../shared/services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  loggedInUser: IUser | undefined;
  private baseUrl = environment['baseUrl'];
  private usersApiPostfix = environment['userApiPostfix'];
  constructor(private _http: HttpClient, private _authTokenService: AuthTokenService, private _userService: UserService) { }

  /**
 * Authenticates the user
 * @return The user credentials
 */
  public login(username: string, password: string): Observable<IUser> {
    let subject = new Subject<IUser>();
    this._http.post<IUser>(`${this.baseUrl}/${this.usersApiPostfix}/login`, { "email": `${username}`, "password": `${password}` }, { observe: 'response' })
      .subscribe
      ((response: any) => {
        const token = response.headers.get(APP_CONST.ACCESS_TOKEN).split(' ')[1];
        if (!token) {
          subject.next(undefined)
          subject.error('No token recieved!')
        }
        else {
          console.log(token)
          //put token to local storage
          this._authTokenService.putJwtToken(token);
          let u: IUser = {
            id: response.body?._id,
            email: response.body?.email,
            name: response.body?.name,
            avatar: response.body?.avatar,
            role: response.body?.role,
          }
          this._userService.updateUser(u); // updating user in shared user service.
          subject.next(u);
        }
      }, (err: any) => {
        // subject.next(undefined);
        subject.error(err);
      });
    return subject.asObservable();
  }
  public logout() {
    this._authTokenService.removeJwtToken();
  }
}
