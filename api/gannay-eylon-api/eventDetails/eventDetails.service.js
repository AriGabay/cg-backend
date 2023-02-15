const db = require('../../../models-gannay-eylon/index');

class eventDetailsService {
  async createEventDetails({ eventInfo, eventDetails, hashTitle }) {
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
        hashTitle: JSON.stringify(hashTitle),
      });
    } catch (error) {
      console.error({
        error: true,
        message: `[SAVE_EVENT_DETAILS_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
  async getEventDetailsBy(query, attributes = []) {
    const options = {
      row: true,
    };
    if (Object.keys(query).length) {
      options.where = { ...query };
    }
    if (attributes.length) {
      options.attributes = [...attributes];
    }
    try {
      return await db.EventDetails.findOne({ ...options });
    } catch (error) {
      console.error({
        error: true,
        message: `[SAVE_EVENT_DETAILS_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
  async getEventsDetailsBy(query) {
    const options = {
      raw: true,
    };
    if (Object.keys(query).length) {
      options.where = { ...query };
    }
    try {
      return await db.EventDetails.findAll({ ...options });
    } catch (error) {
      console.error({
        error: true,
        message: `[SAVE_EVENT_DETAILS_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
  async updateEventDetails(eventDetails, eventInfo, hashTitle, eventDetailsId) {
    const options = {};
    if (eventDetailsId) {
      options.where = { id: eventDetailsId };
    }
    try {
      const eventDetailsDb = await db.EventDetails.findOne({ ...options });
      console.log('eventDetailsDb', eventDetailsDb);
      await eventDetailsDb.update({
        eventDetails: JSON.stringify(eventDetails),
        eventInfo: JSON.stringify(eventInfo),
      });
    } catch (error) {
      console.error({
        error: true,
        message: `[SAVE_EVENT_DETAILS_SERVICE] ${error?.message ?? error}`,
      });
    }
  }
}

module.exports = eventDetailsService;
