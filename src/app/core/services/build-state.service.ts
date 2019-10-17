import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuildStateService {
  constructor(private socket: Socket) {
    this.receiveCurrentState().subscribe(event => console.log('currentState', event));
  }

  receiveCurrentState(): Observable<any> {
    return this.socket.fromEvent('currentState');
  }
}
