const request = require('supertest');
const faker = require('faker/locale/pt_BR');

const app = require('../../src/app');
const connection = require('../../src/database/connection');

const patient = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const anotherPatient = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
};

const doctor = {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  crm: '45678',
};

let patientToken;
let anotherPatientToken;
let doctorToken;

describe('Appointments', () => {
  beforeEach(async () => {
    await connection.migrate.rollback();
    await connection.migrate.latest();

    await request(app).post('/patient').send(patient);
    await request(app).post('/patient').send(anotherPatient);
    await request(app).post('/doctor').send(doctor);

    let req = await request(app).post('/login').send({
      crm: doctor.crm,
      password: doctor.password,
    });
    doctorToken = req.body.token;

    req = await request(app).post('/login').send({
      email: patient.email,
      password: patient.password,
    });
    patientToken = req.body.token;

    req = await request(app).post('/login').send({
      email: anotherPatient.email,
      password: anotherPatient.password,
    });
    anotherPatientToken = req.body.token;
  });

  afterAll(async () => {
    await connection.destroy();
  });

  it('should be able to create a new appointment', async () => {
    const response = await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctor: {
          crm: doctor.crm,
          name: doctor.name,
        },
        date: faker.date.between('2020-07-20', '2020-12-31'),
      });

    expect(response.body.id).toEqual(1);
  });

  it('appointments can only be created if the doctor exists', async () => {
    const response = await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctor: {
          crm: '45687',
          name: doctor.name,
        },
        date: faker.date.between('2020-07-20', '2020-12-31'),
      });

    expect(response.status).toEqual(404);
    expect(response.body.error).toEqual('Doctor not found.');
  });

  it('appointments can only be created by patients', async () => {
    const response = await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        doctor: {
          crm: doctor.crm,
          name: doctor.name,
        },
        date: faker.date.between('2020-07-20', '2020-12-31'),
      });

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual(
      'You do not have permission to access this content.'
    );
  });

  it('only those involved can see the appointments', async () => {
    await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctor: {
          crm: doctor.crm,
          name: doctor.name,
        },
        date: faker.date.between('2020-07-20', '2020-12-31'),
      });

    let responsePatient = await request(app)
      .get('/appointment/1')
      .set('Authorization', `Bearer ${patientToken}`);

    expect(responsePatient.body.id).toEqual(1);

    let responseDoctor = await request(app)
      .get('/appointment/1')
      .set('Authorization', `Bearer ${doctorToken}`);

    expect(responseDoctor.body.id).toEqual(1);

    let responseAnotherPacient = await request(app)
      .get('/appointment/1')
      .set('Authorization', `Bearer ${anotherPatientToken}`);

    expect(responseAnotherPacient.status).toEqual(400);
    expect(responseAnotherPacient.body.error).toEqual(
      'You do not have permission to access this content.'
    );
  });

  it('the patient can update only the date of the appointment and the conclusion', async () => {
    let date = faker.date.between('2020-07-20', '2020-12-31');
    let newDate = faker.date.between('2020-07-20', '2020-12-31');

    await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctor: {
          crm: doctor.crm,
          name: doctor.name,
        },
        date,
      });

    let response = await request(app)
      .patch('/appointment/1')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        date: newDate,
      });
    expect(response.status).toEqual(401);

    response = await request(app)
      .patch('/appointment/1')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        date: newDate,
      });
    expect(response.body.date).toEqual(newDate.toISOString());
  });

  it('the doctor can update only the symptoms and prescriptions of the appointment and the conclusion', async () => {
    await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctor: {
          crm: doctor.crm,
          name: doctor.name,
        },
        date: faker.date.between('2020-07-20', '2020-12-31'),
      });

    let response = await request(app)
      .patch('/appointment/1')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        symptoms: 'tosse',
      });
    expect(response.status).toEqual(401);

    response = await request(app)
      .patch('/appointment/1')
      .set('Authorization', `Bearer ${doctorToken}`)
      .send({
        symptoms: 'tosse',
      });

    expect(response.body.symptoms).toEqual('tosse');
  });

  it('just patient can delete the appointment', async () => {
    await request(app)
      .post('/appointment')
      .set('Authorization', `Bearer ${patientToken}`)
      .send({
        doctor: {
          crm: doctor.crm,
          name: doctor.name,
        },
        date: faker.date.between('2020-07-20', '2020-12-31'),
      });

    let getResponse = await request(app)
      .get('/appointment/1')
      .set('Authorization', `Bearer ${patientToken}`);

    expect(getResponse.body).not.toBeEmpty();
    expect(getResponse.body.id).toEqual(1);

    let deleteResponse = await request(app)
      .delete('/appointment/1')
      .set('Authorization', `Bearer ${patientToken}`);

    expect(deleteResponse.status).toEqual(200);

    getResponse = await request(app)
      .get('/appointment/1')
      .set('Authorization', `Bearer ${patientToken}`);

    expect(getResponse.body).toBeEmpty();
  });
});
