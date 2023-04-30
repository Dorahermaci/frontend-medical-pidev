import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarbackComponent } from './navbarback.component';

describe('NavbarbackComponent', () => {
  let component: NavbarbackComponent;
  let fixture: ComponentFixture<NavbarbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
