import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AirportStatusComponent } from './airport-status.component';

describe('AirportStatusComponent', () => {
  let component: AirportStatusComponent;
  let fixture: ComponentFixture<AirportStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AirportStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AirportStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
