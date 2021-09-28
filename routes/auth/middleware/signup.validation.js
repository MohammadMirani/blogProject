const { Joi } = require("express-validation");
const validator = {};

validator.signup = {
  body: Joi.object({
    username: Joi.string().required().min(5).max(15),
    password: Joi.string()
      .min(8)
      .max(20)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-z A-Z \d]{8,20}$/)
      .required(),
    phonenumber: Joi.string().regex(/^\d{11}$/),
    email: Joi.string().email().required(),
    birthdate: Joi.string().required(),
    sex: Joi.string().required(),
    firstname: Joi.string().required().min(2).max(20),
    lastname: Joi.string().required().min(2).max(20),
  }),
};


module.exports = validator;
