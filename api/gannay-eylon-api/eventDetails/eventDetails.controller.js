const { sendMailGn } = require('../../../services/email.service');
const { buildPdf } = require('./buildPdf.service');

class eventDetailsController {
  constructor(eventDetailsService, categoryGnService) {
    this.EventDetailsService = eventDetailsService;
    this.CategoryGnService = categoryGnService;
  }
  createHashMapCategories = async () => {
    const categories = await this.CategoryGnService.getCategories();
    const hashMap = {};
    categories.forEach((category) => {
      hashMap[category.id] = { ...category };
    });
    return hashMap;
  };
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
      const hashMap = this.createHashMapCategories();
      const pdfBuffer = buildPdf(
        req.body.eventDetails,
        hashMap,
        req.body.eventInfo,
        req.body.hashTitle
      );
      const { eventInfoInputs, ...restData } = req.body;
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
      let select = [];
      if (req.params && req.params.select) {
        select = eval(req.params.select);
      }
      const eventBy = await this.EventDetailsService.getEventDetailsBy(
        query,
        select
      );
      if (!Object.keys(eventBy).length) {
        throw Error('event not found');
      }
      res.json(eventBy);
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  getEventsDetailsBy = async (req, res) => {
    try {
      let query = {};
      if (req.query) {
        query = { ...req.query };
      }

      const eventBy = await this.EventDetailsService.getEventsDetailsBy(query);
      if (!Object.keys(eventBy).length) {
        throw Error('event not found');
      }
      res.json(eventBy);
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
  updateEventDetails = async (req, res) => {
    try {
      const { eventDetails, eventInfo, hashTitle, eventDetailsId } = req.body;
      await this.EventDetailsService.updateEventDetails(
        eventDetails,
        eventInfo,
        hashTitle,
        eventDetailsId
      );
      const hashMap = await this.createHashMapCategories();
      const pdfBuffer = buildPdf(eventDetails, hashMap, eventInfo, hashTitle);
      await sendMailGn(
        pdfBuffer,
        eventDetailsId,
        eventInfo?.email,
        `עדכון תפריט מספר - ${eventDetailsId}`
      );
    } catch (error) {
      res.status(404).send({ error: true, message: error?.message ?? error });
    }
  };
}
module.exports = eventDetailsController;
