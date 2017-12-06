import { TestBed, inject } from '@angular/core/testing';

import { DeathsService } from './deaths.service';

describe('DeathsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DeathsService]
    });
  });

  it('should be created', inject([DeathsService], (service: DeathsService) => {
    expect(service).toBeTruthy();
  }));
});
