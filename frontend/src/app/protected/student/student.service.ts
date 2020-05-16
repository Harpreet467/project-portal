import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {FilterModel} from "../../shared/model/filter.model";
import {AppConfig} from "../../app.config";
import {Student} from "./student.model";
import {ProposalAuthor} from "../proposal-author/proposal-author.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  getFilteredStudent(filter: FilterModel) {
    return this.http.get(AppConfig.STUDENT_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  createStudent(student: Student) {
    return this.http.post(AppConfig.STUDENT_API, student);
  }

  updateStudent(student: Student) {
    return this.http.put(AppConfig.STUDENT_API + '/' + student.id, student);
  }

}
