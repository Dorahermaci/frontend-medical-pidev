import { MedicalFolder } from './../../models/medical-folder.model';
import { Component, OnInit,OnDestroy, ViewChild, ElementRef  } from '@angular/core';
import { MedicalFolderService } from 'src/app/services/medical-folder-service.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs';
declare var jQuery: any;



@Component({
  selector: 'app-medical-folders',
  templateUrl: './medical-folder-back.component.html',
  styleUrls: ['./medical-folder-back.component.css'],
  providers: [MedicalFolderService] // Provide the service here
})
export class MedicalFolderBackComponent implements  OnInit {
  


  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  
  MedicalFolders:  any[]=[];
  closeResult: string ="";
  medicalFolder: MedicalFolder = new MedicalFolder();
  files: File[] = [];
  medicalFolderForm: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];
  filesToUpload: File[] = [];



   
    

    /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private medicalFolderService: MedicalFolderService,private modalService: NgbModal,private fb: FormBuilder) {

   
   

   
    this.medicalFolderForm = this.fb.group({
      title: '',
      hospitalName: '',
      patient: null,
      doctor: null
    });

  } // Inject the service here

  ngOnInit() {


    this.medicalFolderService.getAllMedicalFolders().subscribe(folder => {
      this.MedicalFolders = folder;


    

      setTimeout(()=>{   // here I am rendering web api data
        $('#datatableexample').DataTable( {
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu : [5, 10, 25]
      } );
      }, 1);




      console.log("hello");
      console.table(folder);

   
    });

   



    this.medicalFolderForm = this.fb.group({
      title: '',
      hospitalName: '',
      patient: null,
      doctor: null
    });

    this.medicalFolderService.getAppUsersByRole('PATIENT').subscribe(patients => {
      this.patients = patients;
    });

    this.medicalFolderService.getAppUsersByRole('DOCTOR').subscribe(doctors => {
      this.doctors = doctors;
    });
  }
  modalOpenForm(modalForm: any) {
    this.modalService.open(modalForm);
  }


  onSubmit(): void {
    if (this.medicalFolderForm.valid) {
      const medicalFolder: MedicalFolder = {
        title: this.medicalFolderForm.value.title,
        hospitalName: this.medicalFolderForm.value.hospitalName,
        patient: { id: this.medicalFolderForm.value.patient },
        doctor: { id: this.medicalFolderForm.value.doctor }
      };
  
      this.medicalFolderService.createMedicalFolder(medicalFolder, this.filesToUpload)
        .subscribe(
          response => {
            console.log(`Medical folder created with ID: ${response.id}`);
            // Reset the form and file input
            this.medicalFolderForm.reset();
            this.filesToUpload = [];
          },
          error => {
            console.error(`Error creating medical folder: ${error.message}`);
          }
        );
    }
    this.medicalFolderService.getAllMedicalFolders().subscribe(folder => {
      this.MedicalFolders = folder;


   
    });
  }
  onFileSelect(event: Event): void {
    const input = (event.target as HTMLInputElement);
    if (input.files) {
      this.filesToUpload = Array.from(input.files);
      console.log(this.filesToUpload)
    }
  }

  

  deleteFodler(id: number) {
    console.log(id)
    this.medicalFolderService.deleteMedicalFolder(id)
      .subscribe({
        next: data => {
          console.log(data);
          this.medicalFolderService.getAllMedicalFolders().subscribe(folder => {
            this.MedicalFolders = folder;
    
      
         
          });
      
        },
        error: error => console.log(error)
      });
  }



}
