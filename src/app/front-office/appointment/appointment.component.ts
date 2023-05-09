import { MedicalFolderService } from 'src/app/services/medical-folder-service.service';
import timeGridPlugin  from '@fullcalendar/timegrid';
import dayGridPlugin  from '@fullcalendar/daygrid';
import { CalendarOptions } from '@fullcalendar/core';
import { Component, OnInit,Input, ViewChild  } from '@angular/core';
import { Subject } from 'rxjs';
import { Appointment } from 'src/app/models/appointment';
import { AppointmentService } from 'src/app/services/appointment-service.service';
import { PopoverDirective } from 'ngx-bootstrap/popover';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})



export class AppointmentComponent  implements OnInit {

  @Input() profileId!: string;

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


    
    console.log(this.profileId);
    this.retrieveAppointments(this.profileId);
  }



  



  retrieveAppointments(id:string){
    this.appointmentService.getAppointmentsByUserId(this.profileId).subscribe(appointments => {
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


}
