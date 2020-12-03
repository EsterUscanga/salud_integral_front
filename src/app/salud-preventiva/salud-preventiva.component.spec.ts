import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaludPreventivaComponent } from './salud-preventiva.component';

describe('SaludPreventivaComponent', () => {
  let component: SaludPreventivaComponent;
  let fixture: ComponentFixture<SaludPreventivaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaludPreventivaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaludPreventivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
