import {Category} from '../category/category.model';
import {PageableModel} from '../../shared/model/pageable.model';


export class ProjectModel extends PageableModel {
  objects: Array<ProjectModel>;
}

export class Project {
  id: number;
  proposal_author: number;
  title: string;
  description: string;
  file_name: string;
  file: File;
  category: Array<Category>;
  status: string;

  constructor() {
    this.category = new Array<Category>();
  }
}
