import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthGuardService } from './auth-guard.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ { provide: Router, useClass: class { navigate = jasmine.createSpy("navigateUrl"); } }]
    });
    service = TestBed.inject(AuthGuardService);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
