export class AppConfig {
  public static readonly API = 'api/';

  // Account
  public static readonly AUTH_API = 'auth';
  public static readonly ACCOUNT_DETAILS_API = 'account-details';
  public static readonly REFRESH_TOKEN_API = 'refresh-token';
  public static readonly LOGOUT_API = 'logout';

  // Staff
  public static readonly STAFF_API = AppConfig.API + 'staff';

  // Role
  public static readonly ROLE_API = AppConfig.API + 'role';

  // System Profile
  public static readonly SYSTEM_PROFILE_API = 'system-profiler';

  /* *********************************************************
   Frontend URLs
   ********************************************************* */
  public static readonly ACCOUNT  = 'account/';
  public static readonly LOGIN = AppConfig.ACCOUNT + 'login/';
  public static readonly DASHBOARD = 'dashboard/';

  // Staff
  public static readonly STAFF = 'staff/';

  // System Profile
  public static readonly SYSTEM_PROFILE = 'system-profiler/';

}
