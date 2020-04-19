import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewComment } from './new-comment/newComment';
import { appStateType } from './appStateTypes';
import * as io from 'socket.io-client';

const SOCKET_ENDPOINT: string = 'https://dev-nap.koalament.io';
const LAYER_VERSION: number = 1;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'koalament';
  socket: any;
  key = "https://koalament.io/";
  event = btoa(this.key + "_" + LAYER_VERSION);
  postList: any[] = [];
  newComment: NewComment = new NewComment('');
  // state: appStateType = 'name';
  state: appStateType = 'standby';
  // state: appStateType = 'pay';
  // newComment: NewComment | null = new NewComment('milad');

  ngOnInit() {
    this.socket = io.connect(SOCKET_ENDPOINT, { reconnection: false });
    this.socket.on(this.event, (comment) => {
      // that.onComment(comment, that);
      let a = comment.results
    });
    this.socket.emit("read", {
      key: this.key,
      from: 0,
      limit: 100
    }, (err, comments) => {
      if (err) {
        console.error(err);
        return;
      }
      this.postList = comments.results.map(x => {
        return {
          comment: x.text
        }
      });
      console.log(this.postList);
      
    });
  }

  ngOnDestroy() {
    this.socket.removeListener(this.event)
  }

  onNameSubmit(name: string) {
    if (name == "") {
      name = 'Unknown';
    }
    this.newComment = new NewComment(name);
    this.changeState('comment');
  }

  onCommentSubmit(comment: string) {
    this.newComment.setComment(comment);
    this.changeState('pay');
  }

  changeState(state: appStateType) {
    this.state = state;
  }

  onSuccessPayment(event: any) {
    this.newComment = new NewComment(this.newComment.name);
    this.changeState('standby');
  }
}
