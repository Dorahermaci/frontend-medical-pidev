import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicalFolderBackComponent } from './medical-folder-back.component';

describe('MedicalFolderBackComponent', () => {
  let component: MedicalFolderBackComponent;
  let fixture: ComponentFixture<MedicalFolderBackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicalFolderBackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicalFolderBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
