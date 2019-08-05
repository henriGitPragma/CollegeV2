import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateFileCSVComponent } from './update-file-csv.component';

describe('UpdateFileCSVComponent', () => {
  let component: UpdateFileCSVComponent;
  let fixture: ComponentFixture<UpdateFileCSVComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateFileCSVComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateFileCSVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
