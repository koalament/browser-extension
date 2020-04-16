import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements OnInit {

  @Input('placeholder') placeholder: string = "";
  @Output('onSubmit') onSubmit: EventEmitter<string> = new EventEmitter<string>();
  value: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  submitEvent(e: Event) {
    this.onSubmit.emit(this.value);
    e.preventDefault();
  }

}
