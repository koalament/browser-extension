import { Component } from '@angular/core';
import { NewComment } from './new-comment/newComment';
import { appStateType } from './appStateTypes';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'koalament';
  newComment: NewComment = new NewComment('');
  // state: appStateType = 'name';
  state: appStateType = 'standby';
  // state: appStateType = 'pay';
  // newComment: NewComment | null = new NewComment('milad');

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
