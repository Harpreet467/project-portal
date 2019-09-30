import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {ProjectModel, ProposalAuthorModel} from './proposal-author.model';


@Injectable({
  providedIn: 'root'
})
export class ProposalAuthorService {

  constructor(private http: HttpClient) { }

  createProposal(proposalAuthorModel: ProposalAuthorModel) {
    return this.http.post(AppConfig.PROPOSAL_AUTHOR_API, proposalAuthorModel);
  }

  createProject(projectModel: ProjectModel) {
    return this.http.post(AppConfig.PROJECT_API, projectModel);
  }

  uploadProjectFile(id: number, data) {
    return this.http.patch(AppConfig.PROJECT_UPLOAD_API + id, data);
  }

  getProjectCategory() {
    return this.http.get(AppConfig.PROJECT_CATEGORY_API);
  }

}
