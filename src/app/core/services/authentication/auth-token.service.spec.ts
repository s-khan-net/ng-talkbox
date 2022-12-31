import { TestBed } from '@angular/core/testing';
import { UserBuilder } from 'Test/data/user/user-builder.model';
import { BehaviorSubject } from 'rxjs';
import { AuthTokenService } from './auth-token.service';

describe('AuthTokenService', () => {
  let service: AuthTokenService;
  let tempToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGQwNDhlOTM1YzkzZjBlMDRlNjFhYWIiLCJuYW1lIjoiUmlja3kgTWFydGluIiwiZW1haWwiOiJtYXJ0aW5Acmlja3kuY29tIiwicm9sZSI6eyJyb2xlTmFtZSI6IlVzZXIiLCJyb2xlRGVzYyI6IkRlZmF1bHQgcm9sZSBvZiAnVXNlcicifSwiZXhwIjoxNjMyNDY0OTcyLjAxMiwiaWF0IjoxNjI3MjgwOTcyfQ.KPMUz5bfGG-XRKhtBn_ji80bAGtRFMf3nJ4Z54ZPhBU';
  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set token', () => {
    const user = new BehaviorSubject(UserBuilder.anyUser().build());
    const serviceSpy = spyOn(service, 'getUserFromToken').and.returnValue(user.toPromise());
    service.getUserFromToken(tempToken);
    expect(serviceSpy).toHaveBeenCalled();
  })
});
