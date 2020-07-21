const connection = require('../database/connection');

module.exports = {
  async create(request, response) {
    if (request.category === 'patient') {
      const patient_id = request.userId;
      const { doctor, date } = request.body;

      const d = await connection('doctor')
        .where('crm', doctor.crm)
        .select('*')
        .first();

      if (!d) {
        return response.status(404).json({ error: 'Doctor not found.' });
      }

      const appointment = {
        doctor_crm: d.crm,
        patient_id,
        date,
      };

      const [id] = await connection('appointment').insert(appointment);

      return response.json({ id, ...appointment });
    } else {
      return response
        .status(400)
        .json({ error: 'You do not have permission to access this content.' });
    }
  },

  async update(request, response) {
    let id = request.params.id;
    let body = request.body;

    if (
      request.category === 'patient' &&
      !body.symptoms &&
      !body.prescription
    ) {
      // Pacientes só podem atualizar a data e a conclusão!
      await connection('appointment').update(body).where('id', id);
      let appointment = await connection('appointment')
        .where('id', id)
        .select('*')
        .first();
      return response.status(200).send(appointment);
    } else if (request.category === 'doctor' && !body.date) {
      // Médicos podem atualizar os sintomas e a prescrição.
      await connection('appointment').update(body).where('id', id);

      let appointment = await connection('appointment')
        .where('id', id)
        .select('*')
        .first();
      return response.status(200).send(appointment);
    } else {
      if (body.done) {
        await connection('appointment').update(body).where('id', id);
        let appointment = await connection('appointment')
          .where('id', id)
          .select('*')
          .first();
        return response.status(200).send(appointment);
      } else {
        return response
          .status(401)
          .json({ error: 'Without permission to make such edits.' });
      }
    }
  },

  async show(request, response) {
    const userId = request.userId;
    let id = request.params.id;

    const appointment = await connection('appointment')
      .where('id', id)
      .select('*')
      .first();

    if (!appointment) {
      return response.status(404).send();
    }

    if ([appointment.patient_id, appointment.doctor_crm].includes(userId)) {
      return response.json(appointment);
    } else {
      return response
        .status(400)
        .json({ error: 'You do not have permission to access this content.' });
    }
  },

  async delete(request, response) {
    if (request.category === 'patient') {
      let userId = request.userId;
      let id = request.params.id;

      await connection('appointment')
        .where({
          id,
          patient_id: userId,
        })
        .delete();

      return response.status(200).send();
    } else {
      return response
        .status(401)
        .json({ error: 'Without permission to make such edits.' });
    }
  },
};
