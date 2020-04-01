import { celebrate, Segments, Joi } from 'celebrate';

export function validatePostOngs() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.number().required(),
      city: Joi.string().required(),
      country: Joi.string().required().length(2),
    }),
  });
}

export function validateGetProfile() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  });
}

export function validateDeleteIncidents() {
  return celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  });
}

export function validateGetIncidents() {
  return celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  });
}

export function validatePostIncidents() {
  return celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().required(),
      value: Joi.number().required(),
    }),
  });
}

export function validatePostSession() {
  return celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  });
}
