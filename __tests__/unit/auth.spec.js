const bcrypt = require('bcrypt');

const auth = require('../../src/utils/auth');

describe('Auxiliary authentication methods', () => {
  it('should generate a hash from a string', async () => {
    const hash = await auth.generateHash('string');

    expect(hash).toBeString();
    expect(bcrypt.compare(hash, 'string')).toBeTruthy();
  });

  it('should be able to compare two strings', async () => {
    const hash = await auth.generateHash('string');

    expect(auth.checkPassword(hash, 'string')).toBeTruthy();
  });

  it('should be able to generate an authentication token for the patient', () => {
    let user = { email: 'user@user.com' };
    expect(auth.generateToken(user)).toBeString();
  });

  it('should be able to generate an authentication token for the patient', () => {
    let user = { email: 'user@user.com' };
    expect(auth.generateToken(user)).toBeString();
  });

  it('should be able to generate an authentication token for the doctor', () => {
    let user = { crm: '11111' };
    expect(auth.generateToken(user)).toBeString();
  });
});
