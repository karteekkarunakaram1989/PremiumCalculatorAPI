import { TestBed } from '@angular/core/testing';

import { PremiumServiceService } from './premium-service.service';

describe('PremiumServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PremiumServiceService = TestBed.get(PremiumServiceService);
    expect(service).toBeTruthy();
  });
});
