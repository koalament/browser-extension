import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  @Input('placeholder')placeholder : string = "";
  @Output('onSubmit') onSubmit: EventEmitter<string> = new EventEmitter<string>();
  nickname: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  submitEvent(e:Event){
    this.onSubmit.emit(this.nickname);
    e.preventDefault();
  }

}
