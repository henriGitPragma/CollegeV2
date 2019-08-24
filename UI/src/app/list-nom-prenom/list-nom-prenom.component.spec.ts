import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListNomPrenomComponent } from './list-nom-prenom.component';

describe('ListNomPrenomComponent', () => {
  let component: ListNomPrenomComponent;
  let fixture: ComponentFixture<ListNomPrenomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListNomPrenomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListNomPrenomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
