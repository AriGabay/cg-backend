const db = require('../../../models-gannay-eylon/index');

class eventDetailsService {
  async createEventDetails({ eventInfo, eventDetails }) {
    Object.keys(eventDetails).forEach((catagoryId) => {
      Object.keys(eventDetails[catagoryId]).forEach((productId) => {
        delete eventDetails[catagoryId][productId].imgUrl;
      });
    });
    try {
      return await db.EventDetails.create({
        eventDetails: JSON.stringify(eventDetails),
        eventInfo: JSON.stringify(eventInfo),
        eventDate: eventInfo.eventDate,
      });
    } catch (error) {
      console.error({
        error: true,
        message: `[SAVE_EVENT_DETAILS_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
  async getEventDetailsBy(query) {
    try {
      return await db.EventDetails.findOne({ where: query });
    } catch (error) {
      console.error({
        error: true,
        message: `[SAVE_EVENT_DETAILS_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
}

module.exports = eventDetailsService;
