import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddclaimComponent } from './addclaim.component';

describe('AddclaimComponent', () => {
  let component: AddclaimComponent;
  let fixture: ComponentFixture<AddclaimComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddclaimComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddclaimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
