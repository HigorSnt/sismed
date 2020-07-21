const { celebrate, Joi } = require('celebrate');

module.exports = {
  createDoctor: celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().empty().required().messages({
        'string.base': 'Name must be a string.',
        'string.empty': 'Name cannot be empty.',
        'any.required': 'Name is required.',
      }),
      email: Joi.string().trim().empty().required().email().messages({
        'string.base': 'E-mail must be a string.',
        'string.empty': 'E-mail cannot be empty.',
        'string.email': 'E-mail must be a valid e-mail.',
        'any.required': 'E-mail is required.',
      }),
      password: Joi.string().trim().empty().required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is required.',
      }),
      crm: Joi.string().trim().empty().required().messages({
        'string.base': 'CRM must be a string.',
        'string.empty': 'CRM cannot be empty.',
        'any.required': 'CRM is required.',
      }),
    }),
  }),

  createPatient: celebrate({
    body: Joi.object().keys({
      name: Joi.string().trim().empty().required().messages({
        'string.base': 'Name must be a string.',
        'string.empty': 'Name cannot be empty.',
        'any.required': 'Name is required.',
      }),
      email: Joi.string().trim().empty().required().email().messages({
        'string.base': 'E-mail must be a string.',
        'string.empty': 'E-mail cannot be empty.',
        'string.email': 'E-mail must be a valid e-mail.',
        'any.required': 'E-mail is required.',
      }),
      password: Joi.string().trim().empty().required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is required.',
      }),
    }),
  }),

  login: celebrate({
    body: Joi.object().keys({
      email: Joi.string().trim().empty().email().messages({
        'string.base': 'E-mail must be a string.',
        'string.empty': 'E-mail cannot be empty.',
        'string.email': 'E-mail must be a valid e-mail.',
        'any.required': 'E-mail is required.',
      }),
      password: Joi.string().trim().empty().required().messages({
        'string.base': 'Password must be a string.',
        'string.empty': 'Password cannot be empty.',
        'any.required': 'Password is required.',
      }),
      crm: Joi.string().trim().empty().messages({
        'string.base': 'CRM must be a string.',
        'string.empty': 'CRM cannot be empty.',
        'any.required': 'CRM is required.',
      }),
    }),
  }),

  createAppointment: celebrate({
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    body: Joi.object().keys({
      date: Joi.string().trim().empty().required().messages({
        'string.base': 'Date must be a string.',
        'string.empty': 'Date cannot be empty.',
        'any.required': 'Date is required.',
      }),
      doctor: Joi.object({
        crm: Joi.string().trim().empty().required().messages({
          'string.base': "Doctor's CRM must be a string.",
          'string.empty': "Doctor's CRM cannot be empty.",
          'any.required': "Doctor's CRM is required.",
        }),
        name: Joi.string().trim().empty().required().messages({
          'string.base': "Doctor's name must be a string.",
          'string.empty': "Doctor's name cannot be empty.",
          'any.required': "Doctor's name is required.",
        }),
      }).required(),
    }),
  }),

  appointment: celebrate({
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    params: Joi.object().keys({
      id: Joi.number().required().messages({
        'number.base': 'Id must be a number.',
        'any.required': 'Id is required.',
      }),
    }),
  }),
};
