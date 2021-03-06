const express = require('express');
const adminCtlr = require('../controllers/admin');
const studentCtrlr = require('./../controllers/student');
const loginCtlr = require('../controllers/login');
const testCtlr = require('../controllers/examen');
const auth = require('../middlewares/auth')

const router = express.Router();
const {check} = require('express-validator/check');

// GET de la Principal Page 
router.get('/signin', loginCtlr.loadLogin); // Carga el signin (página principal)

// GET del Aspirante
router.get('/signin/candidate', studentCtrlr.loadLoginCandidate); // Carga el signin del aspirante
router.get('/candidate/profile', studentCtrlr.updateProfile); // Carga el perfil del aspirante
router.get('/candidate/test/pre_started', testCtlr.loadPreStarted); // Carga las instrucciones del examen
router.get('/candidate/test/', testCtlr.loadTest); // Cargas las preguntas y opciones de respuesta

// GET del Administrador
router.get('/signin/admin', adminCtlr.loadLoginAdmin); // Carga el signin del administrador
router.get('/admin/profile', adminCtlr.loadProfile); // Carga el perfil del administrador
router.get('/admin/logout', adminCtlr.logout); // Cerrar sesión del administrador

// POST del Aspirante
router.post('/api/signin/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5})
], studentCtrlr.login); // Postea para el signin del aspirante
router.post('/api/register/candidate', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5}),
    check('firstname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('lastname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('genre').isNumeric().isIn([1, 2, 3]),
    check('birthdate').matches("[0-9]+\/[0-9]+\/[0-9]+").isLength({min: 6}),
    check('currentcity').isAlphanumeric().isLength({min: 3}),
    check('address').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 4}),
    check('phonenumber').isMobilePhone().isLength({max: 12}),
    check('email').isEmail().isLength({min: 7})
], studentCtrlr.register); // Postea para el registro del aspirante

// POST del Admin
router.post('/api/signin/admin', [
    check('username').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('password').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 8})
], adminCtlr.loguearAdmin); // Postea para el signin del admin
router.post('/api/register/admin', [
    check('doctype').isNumeric().isIn([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]),
    check('docnumber').isNumeric().isLength({min: 5}),
    check('firstname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('lastname').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('adminType').matches('[a-zA-Z\\s]+').isLength({min: 5}),
    check('genre').isNumeric().isIn([1, 2, 3]),
    check('birthdate').matches("[0-9]+\/[0-9]+\/[0-9]+").isLength({min: 6}),
    check('currentcity').isAlphanumeric().isLength({min: 3}),
    check('address').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 4}),
    check('phonenumber').isMobilePhone().isLength({max: 12}),
    check('email').isEmail().isLength({min: 7}),
    check('username').matches('[a-zA-Z\\s]+').isLength({min: 4}),
    check('password').matches('[a-zA-Z0-9\\#\\-\\°\\s]+').isLength({min: 8})
], adminCtlr.registrarAdmin); // Postea para el registro del admin

module.exports = router;
