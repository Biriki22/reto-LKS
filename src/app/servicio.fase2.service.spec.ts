import { TestBed } from '@angular/core/testing';

import { ServicioFase2Service } from './servicio.fase2.service';

describe('ServicioFase2Service', () => {
  let service: ServicioFase2Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicioFase2Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
