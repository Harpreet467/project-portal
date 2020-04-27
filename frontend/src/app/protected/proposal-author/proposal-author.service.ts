import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {ProposalAuthor} from './proposal-author.model';
import {toFormData} from '../../layout/file-upload/file-upload.utils';
import {Project} from '../project/project.model';
import {FilterModel} from "../../shared/model/filter.model";


@Injectable({
  providedIn: 'root'
})
export class ProposalAuthorService {

  constructor(private http: HttpClient) { }

  getProposalAuthor() {
    return this.http.get(AppConfig.PROPOSAL_AUTHOR_API);
  }

  getFilteredProposalAuthor(filter: FilterModel) {
    return this.http.get(AppConfig.PROPOSAL_AUTHOR_API, {params: new HttpParams().set('q', JSON.stringify(filter))});
  }

  createProposal(proposalAuthor: ProposalAuthor) {
    return this.http.post(AppConfig.PROPOSAL_AUTHOR_API, proposalAuthor);
  }

  updateProposal(proposalAuthor: ProposalAuthor) {
    return this.http.put(AppConfig.PROPOSAL_AUTHOR_API + '/' + proposalAuthor.id, proposalAuthor);
  }

  createProject(project: Project) {
    return this.http.post(AppConfig.PROJECT_API, project);
  }

  uploadProjectFile(id: number, data) {
    return this.http.patch(
      AppConfig.PROJECT_UPLOAD_API + id,
      toFormData(data), {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

}
