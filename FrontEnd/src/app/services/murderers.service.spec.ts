import { TestBed, inject } from '@angular/core/testing';

import { MurderersService } from './murderers.service';

describe('MurderersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MurderersService]
    });
  });

  it('should be created', inject([MurderersService], (service: MurderersService) => {
    expect(service).toBeTruthy();
  }));
});
