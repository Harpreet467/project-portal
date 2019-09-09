import { Component, OnInit } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loginURL = AppConfig.LOGIN;

  constructor() { }

  ngOnInit() {
  }

}
