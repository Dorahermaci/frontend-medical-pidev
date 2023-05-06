import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MannageClaimsComponent } from './mannage-claims.component';

describe('MannageClaimsComponent', () => {
  let component: MannageClaimsComponent;
  let fixture: ComponentFixture<MannageClaimsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MannageClaimsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MannageClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
