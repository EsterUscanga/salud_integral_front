import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtencionNutricionalComponent } from './atencion-nutricional.component';

describe('AtencionNutricionalComponent', () => {
  let component: AtencionNutricionalComponent;
  let fixture: ComponentFixture<AtencionNutricionalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtencionNutricionalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtencionNutricionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
