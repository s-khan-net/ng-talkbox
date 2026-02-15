import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';
import { IUser } from '../../../../models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {

  public showPassword: boolean = false;
  public inputPasswordType: string = 'password';
  public loginBtnEnabled: boolean = true; //set to false for disabling
  public userEmailModel: string = 'martin@ricky.com';
  public userPasswordModel: string = 'ricky_martin';
  public loginError: boolean = false;
  public loginErrorMessage: string = 'Could not login with the credentials.'
  constructor(private _authenticationService: AuthenticationService, private _router: Router) { }

  ngOnInit(): void {
    //check for auth cookie
  }

  public toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
    this.inputPasswordType = this.inputPasswordType == 'password' ? 'text' : 'password';
  }

  public login(): void {
    this.loginBtnEnabled = false;
    this.loginError = false;
    this._authenticationService.login(this.userEmailModel, this.userPasswordModel).subscribe((user: IUser) => {
      if (!user)
        throw new Error('User was not defined, probably a server error');
      this._router.navigate(['dashboard', { outlets: { navbar: null } }])
    }, ((err) => {
      //log error
      this.loginError = true;
      console.log('Login comp. Error ->', err);
      this.loginBtnEnabled = true;
    }))
  }
}
