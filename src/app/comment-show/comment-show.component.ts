import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrls: ['./comment-show.component.scss']
})
export class CommentShowComponent implements OnInit {

  @Input('postList') postList: any[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    console.log(this.postList);
  }

}
