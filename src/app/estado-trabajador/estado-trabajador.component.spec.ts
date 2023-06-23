import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoTrabajadorComponent } from './estado-trabajador.component';

describe('EstadoTrabajadorComponent', () => {
  let component: EstadoTrabajadorComponent;
  let fixture: ComponentFixture<EstadoTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstadoTrabajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
