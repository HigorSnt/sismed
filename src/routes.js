const express = require('express');

const DoctorController = require('./controllers/DoctorController');
const PatientController = require('./controllers/PatientController');
const LoginController = require('./controllers/LoginController');
const AppointmentController = require('./controllers/AppointmentController');

const authentication = require('./middlewares/authentication');
const validator = require('./validator');

const routes = express.Router();

routes
  .post('/doctor', validator.createDoctor, DoctorController.create)
  .get('/doctor', DoctorController.index)
  .post('/patient', validator.createPatient, PatientController.create)
  .get('/patient', PatientController.index)
  .post('/login', validator.login, LoginController.create);

routes
  .use(authentication)
  .post(
    '/appointment',
    validator.createAppointment,
    AppointmentController.create
  )
  .get('/appointment/:id', validator.appointment, AppointmentController.show)
  .patch(
    '/appointment/:id',
    validator.appointment,
    AppointmentController.update
  )
  .delete(
    '/appointment/:id',
    validator.appointment,
    AppointmentController.delete
  );

module.exports = routes;
