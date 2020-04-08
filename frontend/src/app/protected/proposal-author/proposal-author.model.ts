import {Project} from '../project/project.model';

export class ProposalAuthorModel {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  organisation_name: string;
  status: boolean;
  projects: Array<Project>;

  constructor() {
    this.projects = new Array<Project>();
  }
}
