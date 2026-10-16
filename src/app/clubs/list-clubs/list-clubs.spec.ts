import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListClubs } from './list-clubs';

describe('ListClubs', () => {
  let component: ListClubs;
  let fixture: ComponentFixture<ListClubs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListClubs],
    }).compileComponents();

    fixture = TestBed.createComponent(ListClubs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
