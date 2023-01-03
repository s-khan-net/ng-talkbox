import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  showUserNav: boolean = false;
  userObj: IUser | undefined;
  constructor(private _userService: UserService, private _authenticationService: AuthenticationService, private _router: Router) { }

  public async ngOnInit(): Promise<void> {
    this._userService.currentUser.subscribe((user: IUser) => {
      if (user) {
        if (user?.id.length > 0) {
          this.userObj = user;
        }
        else {
          this.getUserFromUserService();
        }
      }
    });
  }

  private getUserFromUserService(): void {
    this._userService.getUser().then((user: IUser) => {
      if (user?.id.length > 0)
        this.userObj = user;
    }, (err) => {
      console.log('getUser error', err)
    })
  }
  public toggleUserNav() {
    this.showUserNav = !this.showUserNav;
    console.log('showing....', this.showUserNav)
  }

  public redirectTo(keyword: string) {
    this._router.navigateByUrl('/' + keyword);
  }

  public logout(): void {
    this._authenticationService.logout();
    window.location.href = '';
  }
}
