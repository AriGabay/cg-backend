const db = require('../../models/index');
const bcryptjs = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();
class authService {
  login = async ({ user }) => {
    try {
      const userDb = await db.User.findOne({
        where: { userName: user.userName },
      });
      if (!userDb) {
        throw new Error('cannot find user');
      }
      return userDb.dataValues.password;
    } catch (error) {
      console.log('error:', error);
    }
  };
  signUp = async (user) => {
    try {
      return bcryptjs.genSalt(10, async (err, salt) => {
        if (err) {
          throw new Error('error to signUp');
        }
        const result = bcryptjs.hash(user.password, salt, async (err, hash) => {
          const userCreated = await db.User.create({
            userName: user.userName,
            password: hash,
          });
          return userCreated;
        });
        return result;
      });
    } catch (error) {
      console.log('error:', error);
    }
  };
}

module.exports = authService;
