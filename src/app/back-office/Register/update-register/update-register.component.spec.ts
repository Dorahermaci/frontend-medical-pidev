import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateRegisterComponent } from './update-register.component';

describe('UpdateRegisterComponent', () => {
  let component: UpdateRegisterComponent;
  let fixture: ComponentFixture<UpdateRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateRegisterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
