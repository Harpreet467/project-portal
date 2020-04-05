import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../app.config';
import {ProposalAuthorModel} from './proposal-author.model';
import {toFormData} from '../layout/file-upload/file-upload.utils';
import {Project} from '../protected/project/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProposalAuthorService {

  constructor(private http: HttpClient) { }

  createProposal(proposalAuthorModel: ProposalAuthorModel) {
    return this.http.post(AppConfig.PROPOSAL_AUTHOR_API, proposalAuthorModel);
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

  getProjectCategory() {
    return this.http.get(AppConfig.PROJECT_CATEGORY_API);
  }

}
