import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificacionFaltasComponent } from './justificacion-faltas.component';

describe('JustificacionFaltasComponent', () => {
  let component: JustificacionFaltasComponent;
  let fixture: ComponentFixture<JustificacionFaltasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JustificacionFaltasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JustificacionFaltasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
