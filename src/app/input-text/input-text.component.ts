import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent implements OnInit {
  @Input('placeholder')placeholder : string = "";
  @Input('submitValue')submitValue: string = "submit";
  @Output('onSubmit') onSubmit: EventEmitter<string> = new EventEmitter<string>();
  value: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  submitEvent(e:Event){
    this.onSubmit.emit(this.value);
    e.preventDefault();
  }

}
