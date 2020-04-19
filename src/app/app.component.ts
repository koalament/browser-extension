import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewComment } from './new-comment/newComment';
import { appStateType } from './appStateTypes';
import { AppResolverSocketService } from './app.resolver.socket.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'koalament';
  socket: any;
  newComment: NewComment = new NewComment('');
  // state: appStateType = 'name';
  state: appStateType = 'standby';
  // state: appStateType = 'pay';
  // newComment: NewComment | null = new NewComment('milad');

  constructor(public resolver: AppResolverSocketService) { }

  ngOnInit() {

  }

  ngOnDestroy() {
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
