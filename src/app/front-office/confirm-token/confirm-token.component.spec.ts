import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmTokenComponent } from './confirm-token.component';

describe('ConfirmTokenComponent', () => {
  let component: ConfirmTokenComponent;
  let fixture: ComponentFixture<ConfirmTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmTokenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
