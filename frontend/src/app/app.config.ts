export class AppConfig {
  public static readonly API = 'api/';

  // Account
  public static readonly AUTH_API = 'auth';
  public static readonly ACCOUNT_DETAILS_API = 'account-details';
  public static readonly REFRESH_TOKEN_API = 'refresh-token';
  public static readonly LOGOUT_API = 'logout';
  public static readonly CHANGE_PASSWORD_API = 'change-password';

  // Staff
  public static readonly STAFF_API = AppConfig.API + 'staff';

  // Role
  public static readonly ROLE_API = AppConfig.API + 'role';

  // ProjectModel
  public static readonly PROPOSAL_AUTHOR_API = AppConfig.API + 'proposal-author';
  public static readonly PROJECT_CATEGORY_API = AppConfig.API + 'project-category';
  public static readonly PROJECT_API = AppConfig.API + 'project';
  public static readonly PROJECT_UPLOAD_API = AppConfig.PROJECT_API + '/upload/';
  public static readonly PROJECT_DOWNLOAD_API = AppConfig.PROJECT_API + '/download/';

  // ProjectComment
  public static readonly COMMENT_API = AppConfig.API + 'comment';

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

  // Category
  public static readonly CATEGORY = '/category';

  // System Profile
  public static readonly SYSTEM_PROFILE = '/system-profiler/';

}
