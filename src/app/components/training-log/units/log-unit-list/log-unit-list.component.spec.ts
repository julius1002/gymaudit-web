import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogUnitListComponent } from './log-unit-list.component';

describe('LogUnitListComponent', () => {
  let component: LogUnitListComponent;
  let fixture: ComponentFixture<LogUnitListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogUnitListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogUnitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
