import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGlobalComponent } from './list-global.component';

describe('ListGlobalComponent', () => {
  let component: ListGlobalComponent;
  let fixture: ComponentFixture<ListGlobalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListGlobalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListGlobalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
