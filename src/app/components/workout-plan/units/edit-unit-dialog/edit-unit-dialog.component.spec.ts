import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnitDialogComponent } from './edit-unit-dialog.component';

describe('EditUnitDialogComponent', () => {
  let component: EditUnitDialogComponent;
  let fixture: ComponentFixture<EditUnitDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnitDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnitDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
