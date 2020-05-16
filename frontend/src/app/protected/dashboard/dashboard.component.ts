import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../../app.config";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  project_proposal_url = AppConfig.PROJECT_PROPOSAL;
  student_proposal_url = AppConfig.STUDENT_PROPOSAL;

  constructor() { }

  ngOnInit() {
  }

}
