import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcoursefrontComponent } from './listcoursefront.component';

describe('ListcoursefrontComponent', () => {
  let component: ListcoursefrontComponent;
  let fixture: ComponentFixture<ListcoursefrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcoursefrontComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListcoursefrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
