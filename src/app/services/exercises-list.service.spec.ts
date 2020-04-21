import { TestBed } from '@angular/core/testing';

import { ExercisesListService } from './exercises-list.service';

describe('ExercisesListService', () => {
  let service: ExercisesListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExercisesListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
