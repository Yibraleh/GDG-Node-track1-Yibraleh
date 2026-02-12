import Joi from "joi";

const userSchema = Joi.object({
  name: Joi.string().min(3).required()
});

export const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: error.details[0].message
    });
  }

  next();
};
