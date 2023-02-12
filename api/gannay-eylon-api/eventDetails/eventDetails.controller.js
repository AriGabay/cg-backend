const { sendMailGn } = require('../../../services/email.service');
const { buildPdf } = require('./buildPdf.service');

class eventDetailsController {
  constructor(eventDetailsService, categoryGnService) {
    this.EventDetailsService = eventDetailsService;
    this.CategoryGnService = categoryGnService;
  }

  sendEventDetails = async (req, res) => {
    try {
      if (
        !req.body ||
        !req.body.eventDetails ||
        !req.body.eventInfo ||
        !req.body.hashTitle ||
        !Object.keys(req.body.eventDetails).length ||
        !Object.keys(req.body.eventInfo).length ||
        !Object.keys(req.body.hashTitle).length
      ) {
        throw new Error('mising params');
      }
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
      await sendMailGn(pdfBuffer, eventDetails.id, eventInfoInputs?.email);
      res.send('sent !');
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  getEventDetails = async (req, res) => {
    try {
      const query = { ...req.query };
      const eventBy = await this.EventDetailsService.getEventDetailsBy(query);
      if (!Object.keys(eventBy).length) {
        throw Error('event not found');
      }
      res.json(eventBy);
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = eventDetailsController;
