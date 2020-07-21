const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

const patient1 = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const patient2 = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

describe('Patients', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new patient', async () => {
    const response = await request(app).post('/patient').send(patient1);

    expect(response.body).toHaveProperty('email');
    expect(response.body.email).toEqual(patient1.email);
  });

  it('shoul be able to generate an error when creating patient without data', async () => {
    const response = await request(app).post('/patient').send();

    expect(response.body.statusCode).toEqual(400);
    expect(response.body.message).toEqual('Name is required.');
  });

  it('should be able to list all registered users', async () => {
    await request(app).post('/patient').send(patient1);
    await request(app).post('/patient').send(patient2);

    const response = await request(app).get('/patient');

    expect(response.body).toBeArray();
    expect(response.body).toBeArrayOfSize(2);
    expect(response.body).toIncludeAllMembers([
      { name: patient1.name, email: patient1.email },
      { name: patient2.name, email: patient2.email },
    ]);
  });
});
