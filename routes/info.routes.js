const { Router } = require('express');
const { info, warning, error } = require('../controllers/info.controller');

const router = Router();

router.get('/',        info);
router.get('/info',    info);
router.get('/warning', warning);
router.get('/error',   error);

/*
router.get('/favicon.ico', (req, res) => {
    res.sendStatus(200);
});
*/

module.exports = { router };
