import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileExerciseComponent } from './profile-exercise.component';

describe('ProfileExerciseComponent', () => {
  let component: ProfileExerciseComponent;
  let fixture: ComponentFixture<ProfileExerciseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileExerciseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileExerciseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
