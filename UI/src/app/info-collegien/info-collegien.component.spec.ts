import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCollegienComponent } from './info-collegien.component';

describe('InfoCollegienComponent', () => {
  let component: InfoCollegienComponent;
  let fixture: ComponentFixture<InfoCollegienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoCollegienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCollegienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
