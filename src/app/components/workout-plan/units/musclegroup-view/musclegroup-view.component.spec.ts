import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusclegroupViewComponent } from './musclegroup-view.component';

describe('MusclegroupViewComponent', () => {
  let component: MusclegroupViewComponent;
  let fixture: ComponentFixture<MusclegroupViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusclegroupViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusclegroupViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
