import {Project} from '../project/project.model';
import {PageableModel} from '../../shared/model/pageable.model';

export class StudentModel extends PageableModel {
  objects: Array<Student>;
}

export class Student {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  description: string;
  city: string;
  country: string;
  is_in_team: boolean;
  status: string;
  project: number;
  projects: Project;
  updated_at: string;
  created_at: string;
  last_updated_by: string;
}

export const studentDisplayedColumns = [
  'id',
  'name',
  'email',
  'phone_number',
  'description',
  'updated_at',
  'status',
  'action'
];

export const projectDisplayedColumns = [
  'title',
  'description',
  'category',
  'updated_at',
  'action'
];
