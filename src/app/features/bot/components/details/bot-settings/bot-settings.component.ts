import { Component, Input, OnInit } from '@angular/core';
import { IBot } from 'src/app/models/bot.model';
import * as _ from "lodash";

@Component({
  selector: 'app-bot-settings',
  templateUrl: './bot-settings.component.html',
  styleUrls: ['./bot-settings.component.scss']
})
export class BotSettingsComponent implements OnInit {

  constructor() { }

  @Input() public bot!: IBot;

  ngOnInit(): void {
    if (this.bot?.referrers && this.bot?.referrers.length > 0) {
      this._referrers = _.cloneDeep(this.bot?.referrers);
    }
  }

  public _referrers: any[] = [''];
  public saveDisabled: boolean = true;
  public reffererErrTitle: string = '';

  public addReferrer(i: number) {
    let ref = false;
    this._referrers.forEach(element => {
      if (element.length <= 2)
        ref = true;
    });
    if (ref)
      return;
    else {
      this._referrers.push('')
    }
    this._checkDisabled();
  }

  public removeReferrer(i: number) {
    this._referrers.splice(i, 1);
    this._checkDisabled();
  }

  public checkReferrer(event: any) {
    const val = event.target.value;
    if (val.length < 3 && val.indexOf('.') == -1) {
      this.reffererErrTitle = 'Please enter a valid URL';
    }
    this._checkDisabled();
  }

  public trackByFn(index: any, item: any) {
    return index;
  }

  public saveReferrers() {
    this.bot.referrers = this._referrers;
    console.log('saved referrrers', this.bot.referrers);
    this._checkDisabled();
  }

  private _checkDisabled() {
    if (!_.isEqual(this._referrers, this.bot.referrers)) {
      this.saveDisabled = false;
    }
    else {
      this._referrers.forEach(element => {
        if (element.length > 3 && element.indexOf('.') > -1) {
          this.saveDisabled = false;
        }
        else {
          this.saveDisabled = true;
        }
      });
    }
  }
}

