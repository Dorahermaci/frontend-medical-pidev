import { Injectable } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor() { }

  getCalendarOptions(evts: any[]): CalendarOptions {
    return {
      initialView: 'dayGridMonth',
      plugins: [dayGridPlugin, timeGridPlugin], 
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay'
      },
      themeSystem: 'bootstrap',
      events: evts
    };
  }

  getEventContentCallback(): (arg: any) => { html: string; class: string } {
    return (arg: any) => {
      return {
        html: '<b>' + arg.event.title + '</b><br><i>' + arg.timeText + '</i>',
        class: 'custom-event-class'
      };
    };
  }
}
