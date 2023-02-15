const myUrl = '/api/gannay-eylon/eventDetails';
class EventDetailsRoute {
  constructor(app, eventDetailsController) {
    this.EventDetailsController = eventDetailsController;
    this.app = app;
    this.post();
    this.get();
    this.getManyBy();
    this.getOneBy();
    this.update();
  }
  post() {
    this.app.post(myUrl, this.EventDetailsController.sendEventDetails);
  }
  get() {
    this.app.get(myUrl, this.EventDetailsController.getEventDetails);
  }
  getOneBy() {
    this.app.get(
      myUrl + '/:select',
      this.EventDetailsController.getEventDetails
    );
  }
  getManyBy() {
    this.app.get(
      myUrl + '/many',
      this.EventDetailsController.getEventsDetailsBy
    );
  }
  update() {
    this.app.put(myUrl, this.EventDetailsController.updateEventDetails);
  }
}

module.exports = EventDetailsRoute;
