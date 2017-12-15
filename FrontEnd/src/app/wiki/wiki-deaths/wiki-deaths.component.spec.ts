import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiDeathsComponent } from './wiki-deaths.component';

describe('WikiDeathsComponent', () => {
  let component: WikiDeathsComponent;
  let fixture: ComponentFixture<WikiDeathsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiDeathsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiDeathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
