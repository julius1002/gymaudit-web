import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileUnitComponent } from './profile-unit.component';

describe('ProfileUnitComponent', () => {
  let component: ProfileUnitComponent;
  let fixture: ComponentFixture<ProfileUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileUnitComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
