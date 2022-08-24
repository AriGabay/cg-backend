
const myUrl = '/api/isMenuEnable';
class isMenuEnableRoute {
  constructor(app, IsMenuEnableController) {
    this.isMenuEnableController = IsMenuEnableController;
    this.app = app;
    this.getAllMenuEnables();
    this.setIsMenuEnable();
    this.getAllMenus();
  }
  setIsMenuEnable(){
    this.app.post(myUrl,this.isMenuEnableController.setIsMenuEnable)
  }

  getAllMenuEnables() {
    this.app.get(myUrl + '/getAllMenuEnables', this.isMenuEnableController.getAllMenuEnables);
  }
  getAllMenus() {
    this.app.get(myUrl + '/getAllMenus', this.isMenuEnableController.getAllMenus);
  }
}

module.exports = isMenuEnableRoute;
