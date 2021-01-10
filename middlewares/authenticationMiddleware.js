const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');
const models = require('../models');

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

  jwt.verify(token, config.JWTSECRET, async (err, data) => {
    if(err) {
      next();
    } else {
      const user = await models.User.findByPk(parseInt(data.userId));

      req.user = user;
      next();
    }
  });
};

module.exports = authenticationMiddleware;