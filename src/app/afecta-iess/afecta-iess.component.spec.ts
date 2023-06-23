import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AfectaIessComponent } from './afecta-iess.component';

describe('AfectaIessComponent', () => {
  let component: AfectaIessComponent;
  let fixture: ComponentFixture<AfectaIessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AfectaIessComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AfectaIessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
