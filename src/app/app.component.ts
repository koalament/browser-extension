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

  onNameSubmit(name: string) {
    this.newComment = new NewComment(name);
    this.newComment.test();
  }
}
