import { Component } from '@angular/core';
import { NewComment } from './new-comment/newComment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'koalament';
  newComment: NewComment = new NewComment('');
  state: 'name' | 'comment' | 'pay' = 'name';
  // state: 'name' | 'comment' | 'pay' = 'pay';
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

  changeState(state: 'name' | 'comment' | 'pay') {
    this.state = state;
  }
}
