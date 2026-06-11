import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private hubConnection: signalR.HubConnection | undefined;
  
  // Subject that components can subscribe to
  public pollUpdateReceived$ = new Subject<void>();

  constructor() { }

  public startConnection = () => {
    // We assume the signalR hub is at /api/hub/poll
    this.hubConnection = new signalR.HubConnectionBuilder()
                            .withUrl('/api/hub/poll')
                            .build();

    this.hubConnection
      .start()
      .then(() => console.log('SignalR connection started'))
      .catch(err => console.log('Error while starting connection: ' + err));
  }

  public addPollUpdateListener = () => {
    if (this.hubConnection) {
      this.hubConnection.on('ReceivePollUpdate', () => {
        // Emit an event whenever ReceivePollUpdate is triggered
        this.pollUpdateReceived$.next();
      });
    }
  }
}
