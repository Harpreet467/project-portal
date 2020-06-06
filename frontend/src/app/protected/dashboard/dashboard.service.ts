import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilterModel} from "../../shared/model/filter.model";
import {AppConfig} from "../../app.config";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getProjectEval(filter: FilterModel) {
    return this.http.get(AppConfig.PROJECT_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getProjectAuthorEval(filter: FilterModel) {
    return this.http.get(AppConfig.PROPOSAL_AUTHOR_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getProjectCategoryEval(filter: FilterModel) {
    return this.http.get(AppConfig.PROJECT_CATEGORY_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getStudentEval(filter: FilterModel) {
    return this.http.get(AppConfig.STUDENT_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getStaffEval(filter: FilterModel) {
    return this.http.get(AppConfig.STAFF_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getCommentEval(filter: FilterModel) {
    return this.http.get(AppConfig.COMMENT_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getEmailLogEval(filter: FilterModel) {
    return this.http.get(AppConfig.EMAIL_LOG_EVAL_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  getProjectCategoryCount() {
    return this.http.get(AppConfig.PROJECT_CATEGORY_COUNT_API);
  }

  getStaffRoleCount() {
    return this.http.get(AppConfig.STAFF_ROLE_COUNT_API);
  }

}
