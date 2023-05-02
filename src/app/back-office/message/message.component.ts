import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,of } from 'rxjs';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  senderId: number;
  recipientId: number;
  messageBody: string;
  messages: Observable<any[]>; // Add [] to specify that it is an array

  constructor(private http: HttpClient) {
    this.senderId = 0;
    this.recipientId = 0;
    this.messageBody = '';
    this.messages = of([]); // Initialize as an empty observable
  }

  ngOnInit() {
  }

  sendMessage() {
    const body = this.messageBody;
    const url = `http://localhost:8091/messages/${this.senderId}/${this.recipientId}`;
  
    this.http.post(url, body, {
      headers: { 'Content-Type': 'text/plain' }
    })
    .subscribe(response => {
      console.log(response);
    });
  }
  
  
  
  

  getMessages() {
    this.messages = this.http.get<any[]>(`http://localhost:8091/messages/${this.senderId}/${this.recipientId}`);
  }
  
  
  
}
