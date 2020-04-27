export class RolesModel {
  isAdmin: boolean;
  isFirstLevel: boolean;
  isSecondLevel: boolean;
  isThirdLevel: boolean;

  constructor() {
    this.isAdmin = false;
    this.isFirstLevel = false;
    this.isSecondLevel = false;
    this.isThirdLevel = false;
  }
}
