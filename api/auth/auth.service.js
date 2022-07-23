const db = require('../../models/index');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
class authService {
  login = async ({ user }) => {
    try {
      const res = await db.User.findOne({ where: { userName: user.userName } });
      if (!res) {
        throw new Error('cannot find user');
      }
      return res.dataValues.password;
    } catch (error) {
      console.log('error:', error);
    }
  };
  signUp = async (user) => {
    try {
      return await bcryptjs.genSalt(10, async (err, salt) => {
        const result = await bcryptjs.hash(user.password, salt, async (err, hash) => {
          const use = { userName: user.userName, password: hash };
          const res = await db.User.create(use);
          return res;
        });
        return result;
      });
    } catch (error) {
      console.log('error:', error);
    }
  };
}

module.exports = authService;
