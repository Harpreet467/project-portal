import {Category} from '../category/category.model';
import {PageableModel} from '../../shared/model/pageable.model';
import {ProposalAuthorModel} from '../../proposal-author/proposal-author.model';


export class ProjectModel extends PageableModel {
  objects: Array<Project>;
}

export class Project {
  id: number;
  proposal_author: number;
  title: string;
  description: string;
  file_name: string;
  file: File;
  category: Array<Category>;
  proposal_authors: ProposalAuthorModel;
  status: string;
  created_at: string;
  updated_at: string;
  last_updated_by: string;

  constructor() {
    this.category = new Array<Category>();
  }
}

export const projectDisplayedColumns = [
  'id',
  'title',
  'description',
  'category',
  'status',
  'updated_at',
  'action'
];
