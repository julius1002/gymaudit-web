import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSetsFormComponent } from './log-sets-form.component';

describe('LogSetsFormComponent', () => {
  let component: LogSetsFormComponent;
  let fixture: ComponentFixture<LogSetsFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogSetsFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogSetsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
