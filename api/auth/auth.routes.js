const myUrl = '/api/auth';
class authRoute {
  constructor(app, AuthController) {
    this.authController = AuthController;
    this.app = app;
    this.postLogin();
    this.postSignUp();
    this.verify();
  }

  postLogin() {
    this.app.post(myUrl + '/login', this.authController.login);
  }
  postSignUp() {
    this.app.post(myUrl + '/signUp', this.authController.signUp);
  }
  verify() {
    this.app.post(myUrl + '/verify', this.authController.verify);
  }
}

module.exports = authRoute;
