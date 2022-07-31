const { request, response } = require("express");
const { logger } = require("../utils/logger");

const infoLogger = (req = request, res = response, next) => {
  logger.info(`Ruta: ${req.path} Metodo: ${req.method}`);
  next();
};

const warnLogger = (req = request, res = response, next) => {
  logger.warn(`Ruta: ${req.path} Metodo: ${req.method} no encontrado`);
  next();
};

module.exports = { 
  infoLogger, 
  warnLogger };
