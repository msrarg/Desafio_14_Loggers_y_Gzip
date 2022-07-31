const { request }  = require('express');
const { response } = require('express');
const { logger }   = require("../utils/logger");
const process = require('process');

/*
const info = ( req = request, res = response ) => {
    const info = {
        arguments:process.argv.slice(2),
        platform:process.platform,
        nodeVersion:process.version,
        memoryTotalReserved:process.memoryUsage().rss,
        execPath:process.execPath,
        pid:process.pid,
        proyectPath:process.cwd()
    };
    res.render("pages/info",info);
}

const warning = (req, res) => {
    logger.warn('Se registra un warning')
    res.render('WARNING')
};

const error = (req, res) => {
    logger.error('Se registra un error')
    res.render('ERROR')
};
*/

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