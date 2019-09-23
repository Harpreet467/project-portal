import { Injectable } from '@angular/core';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(
    private localStorageService: LocalStorageService
  ) { }

  setRole(roles: string) {
    this.localStorageService.store('roles', roles);
  }

  getRole() {
    return this.localStorageService.retrieve('roles');
  }

  setUserToken(token: string) {
    this.localStorageService.store('token', token);
  }

  getUserToken() {
    return this.localStorageService.retrieve('token');
  }

  setUserRoleToken(token: string) {
    this.localStorageService.store('role-token', token);
  }

  getUserRoleToken() {
    return this.localStorageService.retrieve('role-token');
  }

  setUserId(id: number) {
    this.localStorageService.store('id', id);
  }

  getUserId() {
    return this.localStorageService.retrieve('id');
  }

  setUserName(name: string) {
    this.localStorageService.store('name', name);
  }

  getUserName() {
    return this.localStorageService.retrieve('name');
  }

  setUserEmail(email: string) {
    this.localStorageService.store('email', email);
  }

  getUserEmail() {
    return this.localStorageService.retrieve('email');
  }

}
