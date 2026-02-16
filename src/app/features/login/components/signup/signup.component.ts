import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { IUser } from 'src/app/models/user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  standalone: false
})
export class SignupComponent {

  public showPassword: boolean = false;
  public inputPasswordType: string = 'password';
  public loginBtnEnabled: boolean = true; //set to false for disabling
  public userEmailModel: string = 'martin@ricky.com';
  public userPasswordModel: string = 'ricky_martin';
  public loginError: boolean = false;
  public loginErrorMessage: string = 'Could not login with the credentials.'
  public signupForm = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  /**
   *
   */
  constructor(private _authenticationService: AuthenticationService, private _router: Router) {

  }
  public onSubmit(): void {
    const { name, email, password } = this.signupForm.value;
    console.log('Signup form submitted with values:', { name, email, password });
    let userObj = { "name": `${name}`, "email": `${email}`, "password": `${password}` }
    //call signup method in auth service
    this._authenticationService.signup(userObj).subscribe({
      next: (user: IUser) => {
        console.log('User signed up successfully:', user);
        this._router.navigate(['/dashboard']);
      },
      error: (error: any) => {
        console.error('Error signing up user:', error);
        this.loginError = true;
      }
    });
  }
}
