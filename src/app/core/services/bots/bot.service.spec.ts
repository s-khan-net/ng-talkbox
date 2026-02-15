import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { BotService } from './bot.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('BotService', () => {
  let service: BotService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(BotService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
