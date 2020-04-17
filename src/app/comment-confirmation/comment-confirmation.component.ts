import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as moneyButton from "./money-button.js";

@Component({
  selector: 'app-comment-confirmation',
  templateUrl: './comment-confirmation.component.html',
  styleUrls: ['./comment-confirmation.component.scss']
})
export class CommentConfirmationComponent implements OnInit {

  @ViewChild('moneyBtnHere') moneyBtnHere;
  @Input() name: string;
  @Input() content: string;

  constructor() { }

  ngAfterViewInit(): void {
    moneyButton.render(this.moneyBtnHere.nativeElement, {
      label: "Send",
      clientIdentifier: "36a0fd92080022d9234e610de329e13d",
      buttonId: "234325",
      outputs: [
        {
          to: '14781',
          amount: '0.005',
          currency: 'USD'
        },
        {
          script: 'OP_FALSE OP_RETURN ' + 'test',
          amount: '0',
          currency: 'USD'
        }
      ],
      onPayment: function (arg) {
        console.log(arg);
      },
      onError: function (arg) {
        // alert("Something went wrong!"); console.log('onError', arg) 
      }
    })
  }

  ngOnInit() {
  }

}
