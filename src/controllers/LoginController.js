const connection = require('../database/connection');
const auth = require('../utils/auth');

module.exports = {
  async create(request, response) {
    const { email, password, crm } = request.body;

    let user;

    if (crm) {
      user = await connection('doctor').where('crm', crm).select('*').first();
    } else {
      user = await connection('patient')
        .where('email', email)
        .select('*')
        .first();
    }

    if (!user) {
      return response.status(400).json({
        error: `User with this ${crm ? 'crm' : 'email'} is not found.`,
      });
    }

    if (!(await auth.checkPassword(password, user.password_hash))) {
      return response.status(401).json({ error: 'Incorrect password.' });
    }

    return response.json({
      token: auth.generateToken(user),
    });
  },
};
