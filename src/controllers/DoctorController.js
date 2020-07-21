const connection = require('../database/connection');
const auth = require('../utils/auth');

module.exports = {
  async create(request, response, next) {
    try {
      const { name, crm, email, password } = request.body;

      const password_hash = await auth.generateHash(password);

      await connection('doctor').insert({
        name,
        crm,
        email,
        password_hash,
      });

      return response.json({ crm });
    } catch (error) {
      next(error);
    }
  },

  async index(request, response) {
    const doctors = await connection('doctor').select('name', 'email', 'crm');

    return response.json(doctors);
  },
};
