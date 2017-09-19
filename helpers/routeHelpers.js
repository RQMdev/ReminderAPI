const joi = require('joi');

module.exports = {
  validateBody: function(schema){
    return function(req, res, next){
      const result = joi.validate(req.body, schema);
      if (result.error){
        return res.status(400).json(result.error);
      }

      if (!req.value) { req.value = {};}
      req.value['body'] = result.value;
      next();
    };
  },
  schemas: {
    authSchema: joi.object().keys({
      username: joi.string().required().min(3).max(16),
      email: joi.string().email().required(),
      password: joi.string().required().min(3).max(30)
    })
  }
}