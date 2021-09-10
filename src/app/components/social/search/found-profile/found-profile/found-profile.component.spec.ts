import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FoundProfileComponent } from './found-profile.component';

describe('FoundProfileComponent', () => {
  let component: FoundProfileComponent;
  let fixture: ComponentFixture<FoundProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FoundProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FoundProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
