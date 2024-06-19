import { Injectable } from '@angular/core';
import { Client, IMessage, Stomp, StompHeaders } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Observable, Subject } from 'rxjs';
import { KeycloakService } from '../../keycloak/keycloak.service';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private stompClient: Client;
  private socket: any = new SockJS('http://localhost:8015/ws');
  private likeSubject = new Subject<any>();
  private commentSubjects: Map<number, Subject<any>> = new Map();

  constructor(private keycloakService: KeycloakService) {
    this.stompClient = new Client({
      webSocketFactory: () => this.socket,
      debug: (str) => { console.log(str); },
      onConnect: () => { this.onConnected(); },
      onStompError: (frame) => { console.error(frame); }
    });
    this.stompClient.activate();
  }

  subscribeToComments(postId: number): Observable<any> {
    if (!this.commentSubjects.has(postId)) {
      const subject = new Subject<any>();
      this.stompClient.subscribe(`/topic/comment/${postId}`, (message: IMessage) => {
        subject.next(JSON.parse(message.body));
      });
      this.commentSubjects.set(postId, subject);
    }
    return this.commentSubjects.get(postId)!.asObservable();
  }

  private onConnected() {
    console.log("Connected to WebSocket");
  }

  addComment(comment: any) {
    this.stompClient.publish({
      destination: `/app/comment.create`,
      body: JSON.stringify(comment)
    });
  }
}
