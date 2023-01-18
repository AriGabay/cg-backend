const db = require('../../../models-gannay-eylon/index');

class eventDetailsService {
  async createEventDetails(eventDetails) {
    try {
      return await db.EventDetails.create({
        eventDetails: JSON.stringify(eventDetails),
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
