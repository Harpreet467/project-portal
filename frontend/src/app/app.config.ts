export class AppConfig {
  public static readonly API = 'api/';
  public static readonly EVAL = AppConfig.API + 'eval/';

  // Account
  public static readonly AUTH_API = 'auth';
  public static readonly ACCOUNT_DETAILS_API = 'account-details';
  public static readonly REFRESH_TOKEN_API = 'refresh-token';
  public static readonly LOGOUT_API = 'logout';
  public static readonly CHANGE_PASSWORD_API = 'change-password';

  // Staff
  public static readonly STAFF_API = AppConfig.API + 'staff';
  public static readonly STAFF_EVAL_API = AppConfig.EVAL + 'staff';
  public static readonly STAFF_ROLE_COUNT_API = AppConfig.STAFF_API + '/role/count';

  // Role
  public static readonly ROLE_API = AppConfig.API + 'role';

  // Project Author
  public static readonly PROPOSAL_AUTHOR_API = AppConfig.API + 'proposal-author';
  public static readonly PROPOSAL_AUTHOR_EVAL_API = AppConfig.EVAL + 'proposal-author';

  // Project
  public static readonly PROJECT_CATEGORY_API = AppConfig.API + 'project-category';
  public static readonly PROJECT_CATEGORY_EVAL_API = AppConfig.EVAL + 'project-category';
  public static readonly PROJECT_API = AppConfig.API + 'project';
  public static readonly PROJECT_EVAL_API = AppConfig.EVAL + 'project';
  public static readonly PROJECT_UPLOAD_API = AppConfig.PROJECT_API + '/upload/';
  public static readonly PROJECT_DOWNLOAD_API = AppConfig.PROJECT_API + '/download/';
  public static readonly PROJECT_CATEGORY_COUNT_API = AppConfig.PROJECT_API + '/category/count';

  // ProjectComment
  public static readonly COMMENT_API = AppConfig.API + 'comment';
  public static readonly COMMENT_EVAL_API = AppConfig.EVAL + 'comment';

  // Email logs
  public static readonly EMAIL_LOG_API = AppConfig.API + 'email-log';
  public static readonly EMAIL_LOG_EVAL_API = AppConfig.EVAL + 'email-log';

  // Student
  public static readonly STUDENT_API = AppConfig.API + 'student';
  public static readonly STUDENT_EVAL_API = AppConfig.EVAL + 'student';

  // System Profile
  public static readonly SYSTEM_PROFILE_API = 'system-profiler';

  /* *********************************************************
   Frontend URLs
   ********************************************************* */
  public static readonly HOME = '';

  // Account
  public static readonly ACCOUNT  = 'account/';
  public static readonly LOGIN = AppConfig.ACCOUNT + 'login/';
  public static readonly DASHBOARD = 'dashboard/';

  // Staff
  public static readonly STAFF = '/staff/';

  // ProjectModel
  public static readonly PROJECT_PROPOSAL = '/project-proposal';
  public static readonly PROPOSAL_AUTHOR = '/proposal-author';
  public static readonly PROJECT = '/project';

  // Student
  public static readonly STUDENT = '/student/';
  public static readonly STUDENT_PROPOSAL = '/student-proposal';

  // Category
  public static readonly CATEGORY = '/category';

  // System Profile
  public static readonly SYSTEM_PROFILE = '/system-profiler/';

  // Thank you
  public static readonly THANK_YOU = '/thank-you';

}
