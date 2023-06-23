import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoTrabajadorComponent } from './tipo-trabajador.component';

describe('TipoTrabajadorComponent', () => {
  let component: TipoTrabajadorComponent;
  let fixture: ComponentFixture<TipoTrabajadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoTrabajadorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoTrabajadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
