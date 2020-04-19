import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';

import * as moneyButton from "./money-button.js";
import * as theGzip from "./gzip.js";
import { Buffer } from 'buffer';

const doc = window.document;


@Component({
  selector: 'app-comment-confirmation',
  templateUrl: './comment-confirmation.component.html',
  styleUrls: ['./comment-confirmation.component.scss']
})
export class CommentConfirmationComponent implements OnInit {

  @ViewChild('moneyBtnHere') moneyBtnHere;
  @Input() name: string;
  @Input() content: string;
  @Output() onClose: EventEmitter<void> = new EventEmitter();
  @Output() onSuccess: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngAfterViewInit(): void {
    // let key = doc.location;
    let key = "https://koalament.io/";
    let data = { nickname: this.name, key: key, text: this.content };
    let isReply = false;

    theGzip.gzip(Buffer.from((!isReply ? '0' : '1') + ' ' + JSON.stringify(data), "utf-8")).then(compressed => {
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
            script: 'OP_FALSE OP_RETURN ' + this.toHex('koalament 1 gzip ' + compressed.toString("base64")),
            amount: '0',
            currency: 'USD'
          }
        ],
        onPayment: (arg) => {
          this.onSuccess.emit(arg);
        },
        onError: (arg) => {
          // alert("Something went wrong!"); console.log('onError', arg) 
        }
      })
    });
  }

  ngOnInit() {
  }

  toHex(str) {
    var hex = undefined;
    try {
      hex = unescape(encodeURIComponent(str))
        .split('').map(function (v) {
          return v.charCodeAt(0).toString(16)
        }).join('')
    } catch (e) {

      hex = str
      console.log('invalid text input: ' + str)
    }
    return hex

  }

  close(e) {
    this.onClose.emit();
  }

  prevent(e: Event) {
    e.stopPropagation();
    return;
  }
}
