import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment-service.service';
import { Appointment } from 'src/app/models/appointment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { MedicalFolderService } from 'src/app/services/medical-folder-service.service';
import { PopoverDirective } from 'ngx-bootstrap/popover';


@Component({
  selector: 'app-appointment-back',
  templateUrl: './appointment-back.component.html',
  styleUrls: ['./appointment-back.component.css'],
  providers: [AppointmentService] // Provide the service here
})
export class AppointmentBackComponent implements OnInit {



  @ViewChild('menuPopover')
  private popover!: PopoverDirective; 

  medicalFolderPopover:any;
  medicalFolder!:any;
  userName!:string;
  clickedAppointmentId!:string;

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin], 
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    themeSystem: 'bootstrap',
    events: [],
    eventClick: (info) => {
this.clickedAppointmentId=info.event.id;
      this.MedicalFolderService.getJsonMedicalFolder(info.event.groupId).subscribe(medicalFolder => {
        // store the medical folder data in a component property
        this.medicalFolder = medicalFolder;
        console.log(medicalFolder);
        this.popover.show();

      });
    }
  };

  eventContentCallback = (arg:any) => {
    return {
      html: '<b>' + arg.event.title + '</b><br><i>' + arg.timeText + '</i>',
      class: 'custom-event-class'
    };
  };
  



  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  
  appointments: Appointment[] = [];
  closeResult: string = "";

  constructor(
    private appointmentService: AppointmentService,
    private MedicalFolderService:MedicalFolderService

  ) {}

  ngOnInit() {
   this.retrieveAppointments()
  }


  retrieveAppointments(){
    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.appointments = appointments;
      console.table(appointments);

      this.calendarOptions.events = appointments.map(appointment => {
        return {
          groupId:appointment.medicalFolder.id?.toString(),
          title: appointment.medicalFolder.title,
          start: new Date(appointment.startTime),
          end:new Date(appointment.endTime),
          id:appointment.id
        };
      });
      console.log("hello");
      console.table(appointments);
    });
  }


  deleteAppointment(appointmentId: string) {
    if (this.calendarOptions && Array.isArray(this.calendarOptions.events)) {
      console.table(this.calendarOptions.events)
      const eventIndex = this.calendarOptions.events.findIndex(event => event.id === appointmentId);
      console.log(eventIndex)
      if (eventIndex > -1) {
        this.calendarOptions.events.splice(eventIndex, 1);


          }
    }
    this.appointmentService.deleteAppointmentById(appointmentId).subscribe(()=>{

      this.appointmentService.getAllAppointments().subscribe(appointments => {
        this.appointments = appointments;
        console.table(appointments);
  
        this.calendarOptions.events = appointments.map(appointment => {
          return {
            groupId:appointment.medicalFolder.id?.toString(),
            title: appointment.medicalFolder.title,
            start: new Date(appointment.startTime),
            end:new Date(appointment.endTime),
            id:appointment.id
          };
        });
        console.log("hello");
        console.table(appointments);
      });

    });
  }
  



}
