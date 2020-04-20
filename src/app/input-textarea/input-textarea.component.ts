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
  @Input() standby: BehaviorSubject<boolean>;
  @Output('onSubmit') onSubmit: EventEmitter<string> = new EventEmitter<string>();
  @Output() onChangeLabel: EventEmitter<void> = new EventEmitter();
  maxLength: number = 740;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(this.standby);
    
  }

  submitEvent(e: Event) {
    if (this.value.length > 0) {
      this.onSubmit.emit(this.value);
    }
    e.preventDefault();
  }

  countLength(e: any) {
    if (e.key == "Backspace" || e.key == "Delete") return;
    if (this.value.length > this.maxLength) {
      e.preventDefault();
    }
  }

  changeLabel() {
    this.onChangeLabel.emit();
  }

  turnOn(){
    this.standby.next(false);
  }
}
