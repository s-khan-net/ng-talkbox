import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../shared/services/user.service';
import { IUser } from '../../../../models/user.model';
import { BotService } from 'src/app/core/services/bots/bot.service';
import { IBot } from 'src/app/models/bot.model';
import { Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false
})
export class DashboardComponent implements OnInit {

  private _userId: string = '';
  public bots$: Observable<any> | undefined;
  public loadingError$ = new Subject<boolean>();
  public loadingMsg = 'Loading Bots';
  public errorMsg = 'Error loading bots.';
  public fullScreen: boolean = false;
  public creating: boolean = false;
  public showLoader: boolean = true;
  public error: boolean = false;

  constructor(private _userService: UserService, private _botService: BotService, private _router: Router, private _modalService: NgbModal, private _config: NgbModalConfig,) {
    _config.backdrop = 'static';
    _config.keyboard = false;
  }

  public async ngOnInit(): Promise<void> {
    this._userService.currentUser.subscribe((user: IUser) => {
      if (user?.id) {
        this.getBots();
      }
      else {
        this._userService.getUser().then((user: IUser) => {
          if (user?.id) {
            this.getBots();
          }
          else {
            this._router.navigate(['']);
          }
        }, () => {
          this._router.navigate(['']);
        })

      }
    })
  }
  private getBots() {
    console.log('in bots')
    this.bots$ = this._botService.getBotsForUser().pipe(catchError((err: any) => {
      this.errorMsg = err.error;
      this.loadingError$.next(true);
      this.error = true;
      return of();
    }), finalize(() => this.showLoader = false))
    // .subscribe((bots: [IBot]) => {
    //   console.log(bots);
    // })
  }

  public openModal(newBotContent: any): void {
    this._modalService.open(newBotContent, { ariaLabelledBy: 'create-bot-title' })
      .result
      .then((result: any) => {
        if (result) {
          this.displayCreateLoader(true);
          this.createDefaultBot().then((res: string) => {
            console.log(res);
            this.displayCreateLoader(false);
            this.showLoader = true;
            this.getBots();
          }, (err) => {
            console.log(err);
            this.displayCreateLoader(false);
          });
        }
      }, (closed) => { console.log(closed); });
  }

  private async createDefaultBot(): Promise<string> {
    const defaultBot: IBot = {
      name: 'Untitled Bot'
    }
    return await this._botService.createBot(defaultBot).toPromise();
  }

  private displayCreateLoader(show: boolean): void {
    if (show) {
      this.loadingMsg = "Creating new bot";
      this.fullScreen = true;
      this.creating = true;
      this.showLoader = true;
    }
    else {
      this.loadingMsg = "Loading Bots";
      this.showLoader = false;
      this.creating = false;
    }
  }
}
