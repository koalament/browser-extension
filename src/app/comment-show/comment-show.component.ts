import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comment-show',
  templateUrl: './comment-show.component.html',
  styleUrls: ['./comment-show.component.scss']
})
export class CommentShowComponent implements OnInit {

  @Input('postList') postList: any[] = [];
  postListCount: number = 0;
  @Output('change') change: EventEmitter<void> = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    if(this.postList.length != this.postListCount) {
      this.postListCount = this.postList.length
      this.change.emit();
    }
  }

  ngOnChanges(): void {
  }

}
