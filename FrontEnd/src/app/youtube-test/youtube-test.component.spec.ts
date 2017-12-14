import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeTestComponent } from './youtube-test.component';

describe('YoutubeTestComponent', () => {
  let component: YoutubeTestComponent;
  let fixture: ComponentFixture<YoutubeTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YoutubeTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YoutubeTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
