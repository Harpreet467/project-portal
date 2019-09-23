import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {Staff} from './staff.model';

@Injectable({
  providedIn: 'root'
})
export class StaffService {

  constructor(private http: HttpClient) { }

  getStaffs() {
    return this.http.get(AppConfig.STAFF_API);
  }

  addStaff(staff: Staff) {
    return this.http.post(AppConfig.STAFF_API, staff);
  }

  updateStaff(staff: Staff) {
    return this.http.put(AppConfig.STAFF_API + '/' + staff.id, staff);
  }

  getRoles() {
    return this.http.get(AppConfig.ROLE_API);
  }

}
