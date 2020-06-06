import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {EmailLog, Project, ProjectComment} from "./project.model";
import {FilterModel} from "../../shared/model/filter.model";


@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http: HttpClient) { }

  getProject() {
    return this.http.get(AppConfig.PROJECT_API);
  }

  getProjectById(id: number) {
    return this.http.get(AppConfig.PROJECT_API + '/' + id);
  }

  getFilteredProjects(filter: FilterModel) {
    return this.http.get(AppConfig.PROJECT_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  updateProject(project: Project) {
    return this.http.put(AppConfig.PROJECT_API + '/' + project.id, project);
  }

  getFilteredComments(filter: FilterModel) {
    return this.http.get(AppConfig.COMMENT_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  createComment(projectComment: ProjectComment) {
    return this.http.post(AppConfig.COMMENT_API, projectComment);
  }

  getFilteredEmailLogs(filter: FilterModel) {
    return this.http.get(AppConfig.EMAIL_LOG_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  createEmailLog(emailLog: EmailLog) {
    return this.http.post(AppConfig.EMAIL_LOG_API, emailLog);
  }

}
