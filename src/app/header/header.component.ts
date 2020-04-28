import { Component, OnInit } from '@angular/core';
import { LoadingStateService } from '../loading/loadingState.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public loadingStateS: LoadingStateService) { }

  ngOnInit(): void {
  }

}
