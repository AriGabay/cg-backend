class isMenuEnableController {
  constructor(IsMenuEnableService) {
    this.isMenuEnableService = IsMenuEnableService;
  }
  setIsMenuEnable = async (req, res) => {
    try {
      console.log('req.body   :', req.body);
      if (!Object.keys(req.body).length) {
        return;
      }
      const result = this.isMenuEnableService.setIsMenuEnable(req.body);
      if (!result) {
        throw Error('not found result');
      }
      res.send(result);
    } catch (error) {
      console.log('error:', error);
    }
  };
  getAllMenuEnables = async (req, res) => {
    try {
      const result = await this.isMenuEnableService.getAllMenuEnables();
      if (!result) {
        throw Error('not found result');
      }
      res.send(result);
    } catch (error) {
      console.log('error:', error);
    }
  };
  getAllMenus = async (req, res) => {
    try {
      const result = await this.isMenuEnableService.getAllMenus();
      if (!result) {
        throw Error('not found result');
      }
      res.send(result);
    } catch (error) {
      console.log('error:', error);
    }
  };
}
module.exports = isMenuEnableController;
