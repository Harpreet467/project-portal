import {PageableModel} from '../shared/model/pageable.model';

export class ProposalAuthorModel {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  organisation_name: string;
  status: boolean;
  projects: Array<ProjectModel>;

  constructor() {
    this.projects = new Array<ProjectModel>();
  }
}

export class ProjectModel {
  id: number;
  proposal_author: number;
  title: string;
  description: string;
  file_name: string;
  category: Array<Category>;
  status: string;

  constructor() {
    this.category = new Array<Category>();
  }
}

export class CategoryModel extends PageableModel {
  objects: Array<Category>;
}

export class Category {
  id: number;
  name: string;
  description: string;
  status: boolean;
}
