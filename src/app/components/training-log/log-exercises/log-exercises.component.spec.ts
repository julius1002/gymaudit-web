import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogExercisesComponent } from './log-exercises.component';

describe('LogExercisesComponent', () => {
  let component: LogExercisesComponent;
  let fixture: ComponentFixture<LogExercisesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogExercisesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogExercisesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
