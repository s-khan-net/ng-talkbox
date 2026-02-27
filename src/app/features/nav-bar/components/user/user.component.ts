import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { IUser } from '../../../../models/user.model';
import { UserService } from '../../../../shared/services/user.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../../core/services/authentication/authentication.service';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  standalone: false
})
export class UserComponent implements OnInit {
  showUserNav: boolean = false;
  userObj: IUser | undefined;
  @ViewChild('userToggle') toggleButton!: ElementRef;
  @ViewChild('userMnu') menu!: ElementRef;
  constructor(private _userService: UserService, private _authenticationService: AuthenticationService, private _router: Router, private renderer: Renderer2) {
    // this.renderer.listen('window', 'click',(e:Event)=>{
    //          /**
    //           * Only run when toggleButton is not clicked
    //           * If we don't check this, all clicks (even on the toggle button) gets into this
    //           * section which in the result we might never see the menu open!
    //           * And the menu itself is checked here, and it's where we check just outside of
    //           * the menu and button the condition abbove must close the menu
    //           */
    //         if(e.target !== this.toggleButton.nativeElement && e.target!==this.menu.nativeElement){
    //             this.showUserNav = false;
    //         }
    //     });
   }

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
