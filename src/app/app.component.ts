import { Component } from '@angular/core';
import { NewComment } from './new-comment/newComment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'koalament';

  onNameSubmit(name: string) {
    let newComment = new NewComment(name);
    newComment.test();
  }
}
