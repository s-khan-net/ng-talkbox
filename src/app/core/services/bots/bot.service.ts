import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IBot } from 'src/app/models/bot.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  private baseUrl = environment['baseUrl'];
  private botApiPostfix = environment['botApiPostfix'];
  constructor(private _http: HttpClient) { }

  public getBotsForUser(): Observable<[IBot]> {
    // let hardcodedToken = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwNDhlOTM1YzkzZjBlMDRlNjFhYWIiLCJuYW1lIjoiUmlja3kgTWFydGluIiwiZW1haWwiOiJtYXJ0aW5Acmlja3kuY29tIiwicm9sZSI6eyJyb2xlTmFtZSI6IlVzZXIiLCJyb2xlRGVzYyI6IkRlZmF1bHQgcm9sZSBvZiAnVXNlcicifSwiZXhwIjoxNjMyNDY0OTcyLjAxMiwiaWF0IjoxNjI3MjgwOTcyfQ.KPMUz5bfGG-XRKhtBn_ji80bAGtRFMf3nJ4Z54ZPhBU';
    return this._http.get<[IBot]>(`${this.baseUrl}/${this.botApiPostfix}/me`).pipe(catchError(this.errorHandler));//, { headers: { 'x-auth-token': `${hardcodedToken}` } })
  }

  public getBot(botId: string): Observable<IBot> {
    return this._http.get<IBot>(`${this.baseUrl}/${this.botApiPostfix}/${botId}`).pipe(catchError(this.errorHandler));
  }

  public createBot(bot: IBot): Observable<string> {
    return this._http.post<string>(`${this.baseUrl}/${this.botApiPostfix}`, {
      bot
    }).pipe(catchError(this.errorHandler));
  }

  public updateBot(bot: IBot): Observable<string> {
    return this._http.put<string>(`${this.baseUrl}/${this.botApiPostfix}`, {
      updateBotObj: {
        ...bot
      },
      publish: true
    }).pipe(catchError(this.errorHandler));
  }

  public getColorSchemes(): Observable<any> {
    return this._http.get('../../../../assets/colorSchemes.json');
  }

  errorHandler(error: HttpErrorResponse) {
    return Observable.throw(error.message || "server error.");
  }
}
