import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiLocationsComponent } from './wiki-locations.component';

describe('WikiLocationsComponent', () => {
  let component: WikiLocationsComponent;
  let fixture: ComponentFixture<WikiLocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiLocationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiLocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
