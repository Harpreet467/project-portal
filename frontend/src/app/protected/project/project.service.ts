import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {ProjectComment} from "./project.model";
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

  getFilteredComments(filter: FilterModel) {
    return this.http.get(AppConfig.COMMENT_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  createComment(projectComment: ProjectComment) {
    return this.http.post(AppConfig.COMMENT_API, projectComment);
  }

}
