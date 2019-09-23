import {PageableModel} from '../../shared/model/pageable.model';

export class StaffModel extends PageableModel {
  objects: Array<Staff>;
}

export class Staff {
  id: number;
  name: string;
  email: string;
}

export const displayedColumns = [
  'id',
  'name',
  'email',
  'active'
];
