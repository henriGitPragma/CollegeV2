import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceAdmin2Component } from './advance-admin2.component';

describe('AdvanceAdmin2Component', () => {
  let component: AdvanceAdmin2Component;
  let fixture: ComponentFixture<AdvanceAdmin2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceAdmin2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceAdmin2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
