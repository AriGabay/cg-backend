const { sendMailGn } = require('../../../services/email.service');
const { buildPdf } = require('./buildPdf.service');

class eventDetailsController {
  constructor(eventDetailsService, categoryGnService) {
    this.EventDetailsService = eventDetailsService;
    this.CategoryGnService = categoryGnService;
  }

  sendEventDetails = async (req, res) => {
    try {
      const categories = await this.CategoryGnService.getCategories();
      const hashMap = {};
      categories.forEach((category) => {
        hashMap[category.id] = { ...category };
      });
      const pdfBuffer = buildPdf(
        req.body.eventDetails,
        hashMap,
        req.body.eventInfo,
        req.body.hashTitle
      );
      const { hashTitle, eventInfoInputs, ...restData } = req.body;
      const eventDetails = await this.EventDetailsService.createEventDetails(
        restData
      );
      await sendMailGn(pdfBuffer, eventDetails.id);
      res.send('sent !');
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = eventDetailsController;
