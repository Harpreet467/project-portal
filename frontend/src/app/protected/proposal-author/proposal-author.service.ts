import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AppConfig} from '../../app.config';
import {ProposalAuthor} from './proposal-author.model';
import {toFormData} from '../../layout/file-upload/file-upload.utils';
import {Project} from '../project/project.model';


@Injectable({
  providedIn: 'root'
})
export class ProposalAuthorService {

  constructor(private http: HttpClient) { }

  getProposalAuthor() {
    return this.http.get(AppConfig.PROPOSAL_AUTHOR_API);
  }

  createProposal(proposalAuthor: ProposalAuthor) {
    return this.http.post(AppConfig.PROPOSAL_AUTHOR_API, proposalAuthor);
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
