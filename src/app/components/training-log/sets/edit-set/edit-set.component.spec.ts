/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditSetComponent } from './edit-set.component';

describe('EditSetComponent', () => {
  let component: EditSetComponent;
  let fixture: ComponentFixture<EditSetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditSetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
