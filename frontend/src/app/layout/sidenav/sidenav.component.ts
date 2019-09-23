import {Component, OnInit} from '@angular/core';
import {AppConfig} from '../../app.config';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  staffUrl = AppConfig.STAFF;

  constructor() {
  }

  ngOnInit(): void {
  }

}
