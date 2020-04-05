import {PageableModel} from '../../shared/model/pageable.model';


export class CategoryModel extends PageableModel {
  objects: Array<Category>;
}

export class Category {
  id: number;
  name: string;
  description: string;
  status: boolean;
}
