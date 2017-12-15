import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WikiEpisodesComponent } from './wiki-episodes.component';

describe('WikiEpisodesComponent', () => {
  let component: WikiEpisodesComponent;
  let fixture: ComponentFixture<WikiEpisodesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikiEpisodesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikiEpisodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
