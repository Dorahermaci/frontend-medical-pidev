import {MedicalFolder} from './../../models/medical-folder.model';
import {Component, OnInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import {MedicalFolderService} from 'src/app/services/medical-folder-service.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {MedicalFile} from "../../models/medical-file.model";
import {AppointmentDTO} from "../appointment-back/appointment.dto";

@Component({
  selector: 'app-medical-folders',
  templateUrl: './medical-folder-back.component.html',
  styleUrls: ['./medical-folder-back.component.css'],
  providers: [MedicalFolderService] // Provide the service here
})

export class MedicalFolderBackComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  MedicalFolders: any[] = [];
  closeResult: string = "";
  medicalFolder: MedicalFolder = new MedicalFolder();
  files: File[] = [];
  medicalFolderForm: FormGroup;
  patients: any[] = [];
  doctors: any[] = [];
  filesToUpload: File[] = [];
  isEditMode: boolean = false;
  currentFolderId: number | null = null;
  @ViewChild('modalContent', {static: true}) modalContent!: ElementRef;
  editing: boolean = false;
  medicalFiles: MedicalFile[] | undefined = [];
  selectedMedicalFolderId: number | null = null;
  openAppointmentModal(medicalFolderId: number) {
    this.selectedMedicalFolderId = medicalFolderId;
  }
  /**
   * Constructor
   *
   * @param {NgbModal} modalService
   */
  constructor(private medicalFolderService: MedicalFolderService,
              private modalService: NgbModal,
              private fb: FormBuilder) {
    this.medicalFolderForm = this.fb.group({
      title: '',
      hospitalName: '',
      patient: null,
      doctor: null
    });

  } // Inject the service here
  editFolder(id: number) {
    this.isEditMode = true;
    this.currentFolderId = id;
    this.medicalFolderService.getMedicalFolderById(id).subscribe(folder => {
      this.medicalFolderForm.patchValue({
        title: folder.title,
        hospitalName: folder.hospitalName,
        patient: folder.patient.id,
        doctor: folder.doctor.id,
      });
      this.medicalFiles = folder.medicalFiles;
    });
  }

  appointmentForm = this.fb.group({
    startTime: ['', Validators.required],
    endTime: ['', Validators.required],
    description: ['', Validators.required]
  });

  onAppointmentSubmit(): void {
    if (this.appointmentForm.valid && this.selectedMedicalFolderId) {
      const appointmentDTO: AppointmentDTO = {
        medicalFolderId: this.selectedMedicalFolderId,
        startTime: new Date(this.appointmentForm.value.startTime!),
        endTime: new Date(this.appointmentForm.value.endTime!),
        description: this.appointmentForm.value.description!
      };

      this.medicalFolderService.createAppointment(appointmentDTO)
        .subscribe(
          response => {
            console.log(`Appointment created with ID: ${response.medicalFolderId}`);
            // Reset the form
            this.appointmentForm.reset();
            this.selectedMedicalFolderId = null;
          },
          error => {
            alert("these dates are not available check the calendar ") ;
          }
        );
    }
  }




  ngOnInit() {


    this.medicalFolderService.getAllMedicalFolders().subscribe(folder => {
      this.MedicalFolders = folder;


      setTimeout(() => {   // here I am rendering web api data
        $('#datatableexample').DataTable({
          pagingType: 'full_numbers',
          pageLength: 5,
          processing: true,
          lengthMenu: [5, 10, 25]
        });
      }, 1);
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
        patient: {id: this.medicalFolderForm.value.patient},
        doctor: {id: this.medicalFolderForm.value.doctor},
      };

      if (this.isEditMode && this.currentFolderId) {
        this.medicalFolderService.updateMedicalFolder(this.currentFolderId, medicalFolder, this.filesToUpload)
          .subscribe(
            response => {
              console.log(`Medical folder updated with ID: ${response.id}`);
              this.resetForm();
              this.medicalFolderService.getAllMedicalFolders().subscribe(folder => {
                this.MedicalFolders = folder;
              });
            },
            error => {
              console.error(`Error updating medical folder: ${error.message}`);
            }
          );
      } else {
        this.medicalFolderService.createMedicalFolder(medicalFolder, this.filesToUpload)
          .subscribe(
            response => {
              console.log(`Medical folder created with ID: ${response.id}`);
              this.resetForm();
              this.medicalFolderService.getAllMedicalFolders().subscribe(folder => {
                this.MedicalFolders = folder;
              });
            },
            error => {
              console.error(`Error creating medical folder: ${error.message}`);
            }
          );
      }
    }
  }


  resetForm(): void {
    this.medicalFolderForm.reset();
    this.filesToUpload = [];
    this.isEditMode = false;
    this.currentFolderId = null;
    this.modalService.dismissAll();
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
