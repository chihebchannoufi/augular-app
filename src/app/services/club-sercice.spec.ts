import { TestBed } from '@angular/core/testing';

import { ClubSercice } from './club-sercice';

describe('ClubSercice', () => {
  let service: ClubSercice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClubSercice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
