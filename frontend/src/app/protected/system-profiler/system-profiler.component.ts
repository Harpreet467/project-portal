import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment';
import {AppConfig} from '../../app.config';
import {AlertService} from '../../layout/alert/alert.service';

@Component({
  selector: 'app-system-profiler',
  templateUrl: './system-profiler.component.html',
  styleUrls: ['./system-profiler.component.scss']
})
export class SystemProfilerComponent implements OnInit {
  systemProfilerAPI = environment.HOST + AppConfig.SYSTEM_PROFILE_API;

  constructor(
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  openInfo() {
    this.alertService.info(
      'For guest, USERNAME: `guest` and PASSWORD: `guest`. Or if you have admin access, login accordingly.'
    );
  }

}
