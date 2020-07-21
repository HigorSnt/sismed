require('dotenv').config();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async generateHash(str) {
    return await bcrypt.hash(str, 12);
  },

  async checkPassword(password, hash) {
    let result = await bcrypt.compare(password, hash);

    return result;
  },

  generateToken(user) {
    const credentials = user.crm
      ? {
          id: user.crm,
          category: 'doctor',
        }
      : {
          id: user.email,
          category: 'patient',
        };

    return jwt.sign(credentials, process.env.SECRET);
  },
};
