import {Category} from '../category/category.model';
import {PageableModel} from '../../shared/model/pageable.model';
import {ProposalAuthor} from '../proposal-author/proposal-author.model';
import {Staff} from "../staff/staff.model";
import {Student} from "../student/student.model";


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
  proposal_authors: ProposalAuthor;
  deadline: string | Date;
  availability: string;
  platform: string;
  city: string;
  country: string;
  students: Array<Student>;
  status: string;
  created_at: string;
  updated_at: string;
  last_updated_by: string;

  constructor() {
    this.category = new Array<Category>();
  }
}

export class CommentModel extends PageableModel {
  objects: Array<ProjectComment>;
}

export class ProjectComment {
  id: number;
  project: number;
  student: number;
  students: Student;
  text: string;
  staffs: Staff;
  project_status: string;
  sent_email: boolean;
  commented_by: number;
  status: string;
  created_at: string;
  updated_at: string;
  last_updated_by: string;
}

export class EmailLogModel extends PageableModel {
  objects: Array<EmailLog>;
}

export class EmailLog {
  id: number;
  body: string;
  email_to: string;
  subject: string;
  project: number;
  proposal_author: number;
  proposal_authors: ProposalAuthor;
  sent_by: number;
  staffs: Staff;
  student: number;
  students: Student;
  status: boolean;
  created_at: string;
  updated_at: string;
  last_updated_by: string;
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

export const emailLogDisplayedColumns = [
  'icon',
  'email_to',
  'sent_by',
  'subject',
  'body',
  'created_at'
];
