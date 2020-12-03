import { TestBed } from '@angular/core/testing';

import { SaludPreventivaService } from './salud-preventiva.service';

describe('SaludPreventivaService', () => {
  let service: SaludPreventivaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaludPreventivaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
