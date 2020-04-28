import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';

import { NewComment } from './new-comment/newComment';
import { appStateType } from './appStateTypes';
import { AppResolverSocketService } from './app.resolver.socket.service';
import * as chrome from './chrome.js';
import * as firefoxBrowser from './firefox.js';
import { BehaviorSubject } from 'rxjs';
import { firefox } from './browser';
import { LoadingStateService } from './loading/loadingState.service';
import { NewCommentService } from './new-comment/newComment.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'koalament';
  socket: any;
  state: appStateType = 'name';
  $standby: BehaviorSubject<boolean> = new BehaviorSubject(false)
  // state: appStateType = 'standby';
  // state: appStateType = 'pay';
  // newComment: NewComment | null = new NewComment('milad');

  @ViewChild('comments') commentsElement: ElementRef;

  constructor(
    public resolver: AppResolverSocketService,
    public loadingStateS: LoadingStateService,
    public newCommentS: NewCommentService
  ) { }

  ngOnInit() {
    let setName = (result) => {
      if (result != undefined && result.name != undefined) {
        this.newCommentS.comment = new NewComment(result.name);
        this.changeState('standby');
      }
    }

    if (!firefox(_ => {
      if (firefoxBrowser.store.available()) {
        firefoxBrowser.store.get('name').then(setName)
      } else {
      }
    })) {
      if (chrome.store.available()) {
        chrome.store.get('name').then(setName)
      } else {

      }
    }

  }


  changeOnComments() {
    firefox(() => {
      this.commentsElement.nativeElement.style.flexDirection = "unset";
      this.commentsElement.nativeElement.scrollTop = this.commentsElement.nativeElement.scrollHeight;
    });
  }

  onNameSubmit(name: string) {
    if (name == "" || name == undefined || name == null) {
      name = 'Unknown';
    }
    this.newCommentS.comment = new NewComment(name);
    if (!firefox(_ => {
      if (firefoxBrowser.store.available()) {
        firefoxBrowser.store.set({ name: name }).then(_ => {
          console.log('name stored on firefox cloud!');

        });
      } else {

      }
    })) {
      if (chrome.store.available()) {
        chrome.store.set({ name: name }).then(_ => {
          console.log('name stored on cloud!');

        });
      } else {

      }
    }
    this.changeState('comment');
  }

  onCommentSubmit(comment: string) {
    this.newCommentS.comment.setComment(comment);
    this.changeState('pay');
  }

  changeState(state: appStateType) {
    this.state = state;
    this.$standby.next(this.state === 'standby');
  }

  onSuccessPayment(event: any) {
    this.newCommentS.comment = new NewComment(this.newCommentS.comment.name);
    this.changeState('standby');
  }

  standby() {
    this.changeState('standby');
  }
}
