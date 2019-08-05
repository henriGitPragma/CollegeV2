import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvanceAdminComponent } from './advance-admin.component';

describe('AdvanceAdminComponent', () => {
  let component: AdvanceAdminComponent;
  let fixture: ComponentFixture<AdvanceAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdvanceAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvanceAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
