const jwt = require('jsonwebtoken');
const config = require('../config/appConfig');
const models = require('../models');

const authenticationMiddleware = (req, res, next) => {
  const token = req.headers.authorization ? req.headers.authorization.replace('Bearer ', '') : null;

  jwt.verify(token, config.JWTSECRET, async (err, data) => {
    if(err) {
      next();
    } else {

      if(data.loginType){
        const user = await models.User.findByPk(parseInt(data.entityId));
        req.user = user;
      } else {
        const company = await models.Company.findByPk(parseInt(data.entityId));
        req.company = company;
      }
      
      next();
    }
  });
};

module.exports = authenticationMiddleware;