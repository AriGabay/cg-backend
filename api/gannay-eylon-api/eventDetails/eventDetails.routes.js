const myUrl = '/api/gannay-eylon/eventDetails';
class EventDetailsRoute {
  constructor(app, eventDetailsController) {
    this.EventDetailsController = eventDetailsController;
    this.app = app;
    this.post();
  }
  post() {
    this.app.post(myUrl, this.EventDetailsController.sendEventDetails);
  }
}

module.exports = EventDetailsRoute;
