import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements OnInit {

  @Input('placeholder') placeholder: string = "";
  @Input('label') label: string = "name";
  @Output('onSubmit') onSubmit: EventEmitter<string> = new EventEmitter<string>();
  value: string = "";
  maxLength: number = 740;

  constructor() { }

  ngOnInit(): void {
  }

  submitEvent(e: Event) {
    this.onSubmit.emit(this.value);
    e.preventDefault();
  }

  countLength(e: any) {
    if (e.key == "Backspace" || e.key == "Delete") return;
    if (this.value.length > this.maxLength) {
      e.preventDefault();
    }
  }

}
