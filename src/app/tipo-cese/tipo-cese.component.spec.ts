import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoCeseComponent } from './tipo-cese.component';

describe('TipoCeseComponent', () => {
  let component: TipoCeseComponent;
  let fixture: ComponentFixture<TipoCeseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipoCeseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipoCeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
