import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewlegSearchDialogComponent } from './crewleg-search-dialog.component';

describe('CrewlegSearchDialogComponent', () => {
  let component: CrewlegSearchDialogComponent;
  let fixture: ComponentFixture<CrewlegSearchDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrewlegSearchDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CrewlegSearchDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
