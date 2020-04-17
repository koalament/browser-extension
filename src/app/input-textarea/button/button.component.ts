import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-textarea-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() label: string = 'POST';
  @Input() stringLength: number = 0;
  priceString: string = "$0.0"

  constructor() { }

  ngOnInit(): void {
  }

  // ngOnChanges() {
  //   // let charge = Math.floor(this.stringLength) * 0.01;
  //   // this.priceString = `$${charge.toFixed(2)}`
  // }

}
