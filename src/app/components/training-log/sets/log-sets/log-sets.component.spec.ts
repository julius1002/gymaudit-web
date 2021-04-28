import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSetsComponent } from './log-sets.component';

describe('LogSetsComponent', () => {
  let component: LogSetsComponent;
  let fixture: ComponentFixture<LogSetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogSetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
