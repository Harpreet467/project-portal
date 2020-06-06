import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../app.config";

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.scss']
})
export class ThankYouComponent implements OnInit {
  home_url = AppConfig.HOME;

  constructor() { }

  ngOnInit(): void {
  }

}
