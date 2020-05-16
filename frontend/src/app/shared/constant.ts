export class Constant {
  public static readonly UNAUTHORIZED = 'Unauthorized';

  public static readonly UPLOAD_ALLOWED_FILE_FORMAT = 'txt, pdf, png, jpg, jpeg, gif, zip, doc, docx, ppt, pptx, xls, tar';

  public static readonly MODAL_WIDTH = '600px';
  public static readonly PAGE_SIZE_LIST = [5, 10, 25, 100];

  public static readonly ASC = 'asc';
  public static readonly DESC = 'desc';

  public static readonly ID = 'id';
  public static readonly EQ = 'eq';
  public static readonly HAS = 'has';
  public static readonly ANY = 'any';
  public static readonly EMAIL = 'email';
  public static readonly STATUS = 'status';
  public static readonly PROJECT = 'project';
  public static readonly PROJECTS = 'projects';
  public static readonly PROPOSAL_AUTHORS = 'proposal_authors';
  public static readonly STUDENTS = 'students';
  public static readonly CATEGORY = 'category';
  public static readonly UPDATED_AT = 'updated_at';

  public static readonly PROJECT_STATUS = {
    PROPOSED: 'PROPOSED',
    APPROVED: 'APPROVED',
    DECLINED: 'DECLINED',
    DEFERRED: 'DEFERRED',
    WITHDRAWN: 'WITHDRAWN',
    SKIPPED: 'SKIPPED'
  }

  public static readonly STUDENT_STATUS = {
    INTERESTED: 'INTERESTED',
    APPROVED: 'APPROVED',
    DECLINED: 'DECLINED'
  }
}

export class Messages {
  public static readonly STATUS_CHANGED_SUCCESSFULLY = 'Status changed Successfully!!!';
  public static readonly PASSWORD_NOT_MATCHED = 'Password not matched';
}

export class Roles {
  public static readonly ROLE_ADMIN = 'admin';
  public static readonly FIRST_LEVEL = 'first-level';
  public static readonly SECOND_LEVEL = 'second-level';
  public static readonly THIRD_LEVEL = 'third-level';
}
