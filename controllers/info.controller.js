const { request }  = require('express');
const { response } = require('express');
const { logger }   = require("../utils/logger");

const info = (req, res) => {
    res.send('INFO')
}

const warning = (req, res) => {
    logger.warn('Se registra un warning')
    res.send('WARNING')
};

const error = (req, res) => {
    logger.error('Se registra un error')
    res.send('ERROR')
};

module.exports = {
    info,
    warning,
    error
};