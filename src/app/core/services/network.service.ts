import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private currentNetworkState: BehaviorSubject<any>;
  public networkState: Observable<any>;
  private isOnline = true;
  constructor() {
    this.currentNetworkState = new BehaviorSubject<any>(this.isOnline);
    this.networkState = this.currentNetworkState.asObservable();
  }
}
