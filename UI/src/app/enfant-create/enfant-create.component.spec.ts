import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnfantCreateComponent } from './enfant-create.component';

describe('EnfantCreateComponent', () => {
  let component: EnfantCreateComponent;
  let fixture: ComponentFixture<EnfantCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnfantCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnfantCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
