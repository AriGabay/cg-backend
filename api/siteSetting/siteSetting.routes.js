const myUrl = '/api/siteSetting';

class SiteSettingRoute {
  constructor(app, SiteSettingController) {
    this.siteSettingController = SiteSettingController;
    this.app = app;
    this.getAll();
    this.set();
  }
  getAll() {
    this.app.get(myUrl, this.siteSettingController.getAll);
  }
  set() {
    this.app.post(myUrl, this.siteSettingController.set);
  }
}

module.exports = SiteSettingRoute;
