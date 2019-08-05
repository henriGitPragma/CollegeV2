import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilUserComponent } from './accueil-user.component';

describe('AccueilUserComponent', () => {
  let component: AccueilUserComponent;
  let fixture: ComponentFixture<AccueilUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccueilUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccueilUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
