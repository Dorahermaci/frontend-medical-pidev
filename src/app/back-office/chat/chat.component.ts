import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Pusher from 'pusher-js';
import { environment } from 'src/app/environement/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  chatForm: FormGroup;
  messages: Array<any> = [];

  pusher: any;
  channel: any;
  senderId: number = 125; // Replace with the sender's user ID
  recipientId: number = 128; // Replace with the recipient's user ID

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.chatForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Initialize Pusher
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      forceTLS: true
    });

    // Subscribe to the chat channel
    const roomId = this.getRoomId();
    this.channel = this.pusher.subscribe(`chat-${roomId}`);

    // Listen for new messages
    this.channel.bind('new-message', (data: any) => {
      this.messages.push(data);
    });

    // Get chat history from backend
    this.http.get(`http://localhost:8091/api/chat/${this.senderId}/${this.recipientId}/history`).subscribe((chatHistory: any) => {
      this.messages = chatHistory;
      console.log(chatHistory)
    });
  }

  onSubmit() {
    const message = this.chatForm.get('message')?.value;
    const roomId = this.getRoomId();
    const headers = {
      'Content-Type': 'application/json'
    };
    const body = '"'+message+'"';
    console.log(body);
    
    // Send message to the backend via API
    this.http.post(`http://localhost:8091/api/chat/${this.recipientId}/${this.senderId}`, body, { headers }).subscribe(() => {
      // Message successfully sent, trigger event on Pusher channel
      this.channel.trigger('client-new-message', {
        roomId: roomId,
        message: message,
        senderId: this.senderId,
        recipientId: this.recipientId
      });
    });
  
    this.chatForm.reset();
  }
  
  

  getRoomId(): string {
    // Here, we're simply using the IDs of the two users
    return [this.senderId, this.recipientId].sort().join('-');
  }
}
