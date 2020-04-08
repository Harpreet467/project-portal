import {Project} from '../project/project.model';
import {PageableModel} from '../../shared/model/pageable.model';

export class ProposalAuthorModel extends PageableModel {
  objects: Array<ProposalAuthor>;
}

export class ProposalAuthor {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  organisation_name: string;
  status: boolean;
  projects: Array<Project>;
  updated_at: string;
  created_at: string;
  last_updated_by: string;

  constructor() {
    this.projects = new Array<Project>();
  }
}

export const proposalAuthorDisplayedColumns = [
  'id',
  'name',
  'email',
  'phone_number',
  'organisation_name',
  'updated_at',
  'action'
];
