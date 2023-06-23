import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfectaImpRentaComponent } from './afecta-imp-renta.component';

describe('AfectaImpRentaComponent', () => {
  let component: AfectaImpRentaComponent;
  let fixture: ComponentFixture<AfectaImpRentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfectaImpRentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfectaImpRentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
