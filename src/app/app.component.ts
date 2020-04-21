import { Component, OnInit, OnDestroy } from '@angular/core';

import { NewComment } from './new-comment/newComment';
import { appStateType } from './appStateTypes';
import { AppResolverSocketService } from './app.resolver.socket.service';
import * as chrome from './chrome.js';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'koalament';
  socket: any;
  newComment: NewComment = new NewComment('');
  state: appStateType = 'name';
  $standby: BehaviorSubject<boolean> = new BehaviorSubject(false)
  // state: appStateType = 'standby';
  // state: appStateType = 'pay';
  // newComment: NewComment | null = new NewComment('milad');

  constructor(public resolver: AppResolverSocketService) { }

  ngOnInit() {
    if (chrome.store.available()) {
      chrome.store.get('name').then(result => {
        // console.log(result);
        this.newComment = new NewComment(result.name);
        this.changeState('standby');
      })
    }
  }

  onNameSubmit(name: string) {
    if (name == "" || name == undefined || name == null) {
      name = 'Unknown';
    }
    this.newComment = new NewComment(name);
    if (chrome.store.available()) {
      chrome.store.set({ name: name }).then(_ => {
        console.log('name stored on cloud!');
      });
    }
    this.changeState('comment');
  }

  onCommentSubmit(comment: string) {
    this.newComment.setComment(comment);
    this.changeState('pay');
  }

  changeState(state: appStateType) {
    this.state = state;
    this.$standby.next(this.state === 'standby');
  }

  onSuccessPayment(event: any) {
    this.newComment = new NewComment(this.newComment.name);
    this.changeState('standby');
  }

  standby() {
    this.changeState('standby');
  }
}
