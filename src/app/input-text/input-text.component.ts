import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  @Input('placeholder') placeholder: string = "";
  @Input('submitValue') submitValue: string = "submit";
  @Output('onSubmit') onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Input() value: string = "";
  maxLength: number = 15;


  constructor() { }

  ngOnInit(): void {
  }

  submitEvent(e: Event) {

    if (this.value.length > this.maxLength) {
      return e.preventDefault();
      // this.value = this.value.substr(0, this.maxLength);
    }
    this.onSubmit.emit(this.value);
  }

  countLength(e: any) {
    if (e.key == "Backspace" || e.key == "Delete") return;
    if (this.value.length >= this.maxLength) {
      // this.value = this.value.substr(0, this.maxLength);
      e.preventDefault();
    }
  }
  close(e) {
    this.onClose.emit();
  }

  prevent(e: Event) {
    e.stopPropagation();
    return;
  }
}
