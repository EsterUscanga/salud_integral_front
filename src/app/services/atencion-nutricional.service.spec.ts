import { TestBed } from '@angular/core/testing';

import { AtencionNutricionalService } from './atencion-nutricional.service';

describe('AtencionNutricionalService', () => {
  let service: AtencionNutricionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtencionNutricionalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
