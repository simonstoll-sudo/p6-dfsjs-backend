import Joi from 'joi';

const notionSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(200)
});

const workshopSchema = Joi.object({
  name: Joi.string().required().trim().min(1).max(200),
  notions: Joi.array().items(Joi.string().pattern(/^[0-9a-fA-F]{24}$/))
});

export const validateNotion = (req, res, next) => {
  const { error } = notionSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details[0].message
    });
  }
  next();
};

export const validateWorkshop = (req, res, next) => {
  const { error } = workshopSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Validation error',
      details: error.details[0].message
    });
  }
  next();
};
