import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovimientoExcepcion1y2Component } from './movimiento-excepcion1y2.component';

describe('MovimientoExcepcion1y2Component', () => {
  let component: MovimientoExcepcion1y2Component;
  let fixture: ComponentFixture<MovimientoExcepcion1y2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MovimientoExcepcion1y2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovimientoExcepcion1y2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
