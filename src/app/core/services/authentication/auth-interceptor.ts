import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthTokenService } from '../authentication/auth-token.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private _tokerService: AuthTokenService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this._tokerService.getJwtToken();
        if (!window.navigator.onLine) {
            // if there is no internet, throw a HttpErrorResponse error
            // since an error is thrown, the function will terminate here
            return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.' }));

        }
        if (token) {
            const clonedReq = req.clone({
                headers: req.headers.set(`x-auth-token`, `Bearer ${token}`)
            });
            return next.handle(clonedReq);
        }
        else {
            return next.handle(req);
        }
    }

}