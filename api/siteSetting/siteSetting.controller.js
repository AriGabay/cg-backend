class SiteSettingController {
  constructor(SiteSettingService) {
    this.siteSettingService = SiteSettingService;
  }

  getAll = async (req, res) => {
    try {
      const settings = await this.siteSettingService.getAll();
      res.send(settings);
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };

  set = async (req, res) => {
    try {
      const result = await this.siteSettingService.set(req.body || {});
      res.send(result);
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}

module.exports = SiteSettingController;
