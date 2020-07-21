const connection = require('../database/connection');
const auth = require('../utils/auth');

module.exports = {
  async create(request, response, next) {
    try {
      const { name, email, password } = request.body;

      const password_hash = await auth.generateHash(password);

      await connection('patient').insert({
        name,
        email,
        password_hash,
      });

      return response.json({ email });
    } catch (error) {
      next(error);
    }
  },

  async index(request, response) {
    const users = await connection('patient').select('name', 'email');

    return response.json(users);
  },
};
