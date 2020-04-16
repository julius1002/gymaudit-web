import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitsBarComponent } from './units-bar.component';

describe('UnitsComponent', () => {
  let component: UnitsBarComponent;
  let fixture: ComponentFixture<UnitsBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnitsBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnitsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
