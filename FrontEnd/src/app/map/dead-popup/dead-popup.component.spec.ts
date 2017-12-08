import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeadPopupComponent } from './dead-popup.component';

describe('DeadPopupComponent', () => {
  let component: DeadPopupComponent;
  let fixture: ComponentFixture<DeadPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeadPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeadPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
