export class AlertModel {
  constructor(
    public type: string, public text: string) {
  }
}

export const ALERT_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  INFO: 'info',
  WARNING: 'warning'
};
