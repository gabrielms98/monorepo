import { Component, OnInit, signal } from '@angular/core';
import { NxWelcomeComponent } from './nx-welcome.component';
import { connect, type Socket } from 'socket.io-client';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { environment } from 'environments';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, CommonModule, FormsModule],
  selector: 'monorepo-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'monorepo';
  another = 'test';
  message = '';
  messages = signal<string[]>([]);
  socket: Socket = connect('ws://localhost:8080/chat');

  ngOnInit(): void {
    console.log(environment.apiUrl);
    this.socket.emit('join', { name: 'test' });

    this.socket.on('message', (data) => {
      console.log(data);
      this.messages.update((messages) => [...messages, data.message]);
    });

    // throw new Error('test');
  }

  submit() {
    this.socket.emit('message', { message: this.message });
    this.message = '';
  }
}
