import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-input-textarea',
  templateUrl: './input-textarea.component.html',
  styleUrls: ['./input-textarea.component.scss']
})
export class InputTextareaComponent implements OnInit {

  @Input('placeholder') placeholder: string = "";
  @Input('label') label: string = "name";
  @Input() value: string = "";
  @Input() standby: BehaviorSubject<boolean> = new BehaviorSubject(false);
  @Output('onSubmit') onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChangeLabel: EventEmitter<void> = new EventEmitter();
  isStandby: BehaviorSubject<boolean> = new BehaviorSubject(false);
  maxLength: number = 740;


  constructor() {

  }

  ngOnInit(): void {
    this.standby.subscribe(isStandby => {
      this.isStandby.next(isStandby && this.value == "");
    })
  }

  submitEvent(e: Event) {
    if (this.value.length > 0) {
      if (this.value.length > this.maxLength) {
        return e.preventDefault();

        // this.value = this.value.substr(0, this.maxLength);
      }
      this.onSubmit.emit(this.value);
    }
    e.preventDefault();
  }

  countLength(e: any) {
    if (e.key == "Backspace" || e.key == "Delete") return;
    if (this.value.length >= this.maxLength) {
      // this.value = this.value.substr(0, this.maxLength);
      // e.preventDefault();
    }
  }

  changeLabel() {
    this.onChangeLabel.emit();
  }

  turnOn() {
    if (this.label == "") {
      this.changeLabel()
    } else {
      this.standby.next(false);
    }
  }
}
