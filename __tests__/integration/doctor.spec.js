const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

const doctor1 = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  crm: '123456',
};

const doctor2 = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  crm: '45678',
};

describe('Doctors', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new doctor', async () => {
    const response = await request(app).post('/doctor').send(doctor1);

    expect(response.body).toHaveProperty('crm');
    expect(response.body.crm).toEqual(doctor1.crm);
  });

  it('shoul be able to generate an error when creating doctor without data', async () => {
    const response = await request(app).post('/doctor').send();

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Name is required.');
  });

  it('should be able to list all registered doctors', async () => {
    await request(app).post('/doctor').send(doctor1);
    await request(app).post('/doctor').send(doctor2);

    const response = await request(app).get('/doctor');

    expect(response.body).toBeArray();
    expect(response.body).toBeArrayOfSize(2);
    expect(response.body).toIncludeAllMembers([
      { name: doctor1.name, email: doctor1.email, crm: doctor1.crm },
      { name: doctor2.name, email: doctor2.email, crm: doctor2.crm },
    ]);
  });
});
