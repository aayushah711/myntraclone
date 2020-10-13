const Joi = require('joi');

const registerValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required(),
        fullName: Joi.string(),
        mobile: Joi.number(),
        gender: Joi.string()
    });
    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().required().email(),
        password: Joi.string().min(8).required()
    });
    return schema.validate(data);
};

module.exports = { registerValidation, loginValidation };
