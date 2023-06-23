import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReingresoComponent } from './reingreso.component';

describe('ReingresoComponent', () => {
  let component: ReingresoComponent;
  let fixture: ComponentFixture<ReingresoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReingresoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReingresoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
