import { Component } from '@angular/core';
import { NewComment } from './new-comment/newComment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title: string = 'koalament';
  newComment: NewComment | null = null;
  state: 'name' | 'comment' | 'pay' = 'name';
  // newComment: NewComment | null = new NewComment('milad');

  onNameSubmit(name: string) {
    this.newComment = new NewComment(name);
    this.newComment.test();
    this.state = 'comment';
  }

  onCommentSubmit(comment: string) {
    this.newComment.setComment(comment);
    // console.log(this.newComment);
    this.state = 'pay';
  }
}
