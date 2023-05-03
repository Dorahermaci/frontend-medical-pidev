import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { AppointmentService } from 'src/app/services/appointment-service.service';
import { Appointment } from 'src/app/models/appointment';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';


@Component({
  selector: 'app-appointment',
  templateUrl: './appointment-back.component.html',
  styleUrls: ['./appointment-back.component.css'],
  providers: [AppointmentService] // Provide the service here
})
export class AppointmentBackComponent implements OnInit {


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    themeSystem: 'bootstrap',
    events: []
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
    private appointmentService: AppointmentService
  ) {}

  ngOnInit() {
    this.appointmentService.getAllAppointments().subscribe(appointments => {
      this.appointments = appointments;

      this.calendarOptions.events = appointments.map(appointment => {
        return {
          title: appointment.medicalFolder.title,
          start: new Date(appointment.startTime),
          end:new Date(appointment.endTime)
        };
      });
      console.log("hello");
      console.table(appointments);
    });
  }



}
