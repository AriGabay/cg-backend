class authController {
  constructor(AuthService, Bcryptjs, Jwt, Logger) {
    this.authService = AuthService;
    this.bcryptjs = Bcryptjs;
    this.jwt = Jwt;
    this.logger = Logger;
  }
  login = async (req, res) => {
    try {
      const result = await this.authService.login({ user: req.body });
      if (result && result.length) {
        const isEqual = await this.bcryptjs.compareSync(
          req.body.password,
          result
        );
        if (isEqual) {
          return this.jwt.sign(
            { userName: req.body.userName },
            'secret',
            (err, token) => {
              res.status(200).json({
                msg: 'Auth Successful !',
                token,
              });
            }
          );
        } else {
          res.status(500).json({
            msg: 'Something went wrong !',
          });
        }
      } else {
        res.status(500).json({ msg: 'Something went wrong !' });
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  signUp = async (req, res) => {
    try {
      const result = await this.authService.signUp(req.body);
      if (result && result.length) {
        res.status(201).json({
          msg: 'User created successfully',
          result: result,
        });
      } else {
        res.status(500).json({ msg: 'Something went wrong !' });
      }
    } catch (error) {
      console.log('error:', error);
    }
  };
  verify = async (req, res) => {
    try {
      this.jwt.verify(req.body.token, 'secret', (err, decoded) => {
        if (err) {
          console.log('err:', err);
          this.logger.info('Error Verify: ' + err);
          return res.status(401).send();
        } else {
          return res.status(200).json({ msg: 'valid', decoded });
        }
      });
    } catch (error) {
      console.log('error:', error);
    }
  };
}
module.exports = authController;
