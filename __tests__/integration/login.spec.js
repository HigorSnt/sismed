const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');

const patient = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const doctor = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  crm: '123456',
};

describe('Login', () => {
  it('patient should be able to login', async () => {
    await request(app).post('/patient').send(patient);

    const response = await request(app).post('/login').send({
      email: patient.email,
      password: patient.password,
    });

    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeString();
  });

  it('doctor should be able to login', async () => {
    await request(app).post('/doctor').send(doctor);

    const response = await request(app).post('/login').send({
      crm: doctor.crm,
      password: doctor.password,
    });
    expect(response.body).toHaveProperty('token');
    expect(response.body.token).toBeString();
  });

  it('email or crm incorrect should generate an error', async () => {
    let response;
    response = await request(app).post('/login').send({
      crm: '54489',
      password: doctor.password,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('User with this crm is not found.');

    response = await request(app).post('/login').send({
      email: faker.internet.email(),
      password: patient.password,
    });

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('User with this email is not found.');
  });

  it('password incorrect should generate an error', async () => {
    let response;
    response = await request(app).post('/login').send({
      crm: doctor.crm,
      password: 'vfewas1631',
    });

    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual('Incorrect password.');

    response = await request(app).post('/login').send({
      email: patient.email,
      password: faker.internet.password(),
    });

    expect(response.status).toEqual(401);
    expect(response.body.error).toEqual('Incorrect password.');
  });
});
