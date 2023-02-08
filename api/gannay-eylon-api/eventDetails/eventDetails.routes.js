const myUrl = '/api/gannay-eylon/eventDetails';
class EventDetailsRoute {
  constructor(app, eventDetailsController) {
    this.EventDetailsController = eventDetailsController;
    this.app = app;
    this.post();
    this.get();
  }
  post() {
    this.app.post(myUrl, this.EventDetailsController.sendEventDetails);
  }
  get() {
    this.app.get(myUrl, this.EventDetailsController.getEventDetails);
  }
}

module.exports = EventDetailsRoute;
