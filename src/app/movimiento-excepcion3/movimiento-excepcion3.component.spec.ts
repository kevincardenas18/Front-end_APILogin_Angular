import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoExcepcion3Component } from './movimiento-excepcion3.component';

describe('MovimientoExcepcion3Component', () => {
  let component: MovimientoExcepcion3Component;
  let fixture: ComponentFixture<MovimientoExcepcion3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoExcepcion3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoExcepcion3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
