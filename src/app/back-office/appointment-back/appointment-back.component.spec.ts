import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentBackComponent } from './appointment-back.component';

describe('AppointmentBackComponent', () => {
  let component: AppointmentBackComponent;
  let fixture: ComponentFixture<AppointmentBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppointmentBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
