import { TestBed } from '@angular/core/testing';

import { JustificacionFaltasService } from './justificacion-faltas.service';

describe('JustificacionFaltasService', () => {
  let service: JustificacionFaltasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JustificacionFaltasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
