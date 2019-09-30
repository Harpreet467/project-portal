import { Component, OnInit } from '@angular/core';
import {AppConfig} from '../app.config';
import {StorageService} from '../shared/service/storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  project_proposal_url = AppConfig.PROJECT_PROPOSAL;

  constructor(
    private storageService: StorageService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.storageService.getUserToken()) {
      this.router.navigate([AppConfig.DASHBOARD]);
    }
  }

}
