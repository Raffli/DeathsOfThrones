import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodePopupComponent } from './episode-popup.component';

describe('EpisodePopupComponent', () => {
  let component: EpisodePopupComponent;
  let fixture: ComponentFixture<EpisodePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
