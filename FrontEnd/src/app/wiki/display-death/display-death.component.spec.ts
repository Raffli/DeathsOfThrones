import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDeathComponent } from './display-death.component';

describe('DisplayDeathComponent', () => {
  let component: DisplayDeathComponent;
  let fixture: ComponentFixture<DisplayDeathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayDeathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDeathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
