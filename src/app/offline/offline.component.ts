import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppResolverSocketService } from '../app.resolver.socket.service';

@Component({
  selector: 'app-offline',
  templateUrl: './offline.component.html',
  styleUrls: ['./offline.component.scss']
})
export class OfflineComponent implements OnInit {
  
  constructor(private resolver: AppResolverSocketService) { }

  ngOnInit(): void {
  }

  retry(){
    this.resolver.retry();
  }

}
