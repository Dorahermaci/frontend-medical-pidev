import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardclaimComponent } from './dashboardclaim.component';

describe('DashboardclaimComponent', () => {
  let component: DashboardclaimComponent;
  let fixture: ComponentFixture<DashboardclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
