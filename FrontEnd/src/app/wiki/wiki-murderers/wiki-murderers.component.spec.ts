import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiMurderersComponent } from './wiki-murderers.component';

describe('WikiMurderersComponent', () => {
  let component: WikiMurderersComponent;
  let fixture: ComponentFixture<WikiMurderersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiMurderersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiMurderersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
