import {environment} from '../environments/environment';

export class AppConfig {
  public static HOST_URL = environment.HOST;

  public static loginModule = AppConfig.HOST_URL + 'login';
  public static signUpModule = AppConfig.HOST_URL + 'signup';

  /* *********************************************************
   Frontend URLs
   ********************************************************* */
  public static ACCOUNT  = 'account/';
  public static LOGIN = AppConfig.ACCOUNT + 'login/';

}
