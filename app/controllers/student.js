const Student = require('../models/student');
const bcrypt = require('bcrypt');
const service = require("../services")
const fs = require('fs');
const path = require('path');

const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

function loadLoginCandidate(req, res){
    res.render("../views/login-candidate/login-candidate.ejs")
}

function updateProfile(req, res){
    res.render("../views/candidate-update/candidate-update.ejs")
}

function login(req, res){
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    Student.findOne({ doctype: fromNumberToDocType(req.body.doctype), docnumber: req.body.docnumber }).select('doctype +docnumber').exec(function (err, new_candidate) {
        if (err) return res.status(500).send({ 
            message: err 
        })
        if (new_candidate == null) {
            return res.status(404).send({ 
                message: 'Aspirante incorrecto' 
            })
        }
        return res.status(200).send({
            message: 'Login exitoso del aspirante',
            token: service.createToken(new_candidate)
        })
    })
}

function register(req, res) {
    var errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    }
    const new_candidate = new Student({
        _id : mongoose.Types.ObjectId(),
        doctype: fromNumberToDocType(req.body.doctype),
        docnumber: req.body.docnumber,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        genre: fromNumberToGenre(req.body.genre),
        birthdate: req.body.birthdate,
        currentcity: req.body.currentcity,
        address: req.body.address,
        phonenumber: req.body.phonenumber,
        email: req.body.email
    });
    //save in the database
    new_candidate.save((err) => {
        if (err) return res.status(500).send({ 
            message: `Error al crear el aspirante: ${err}` 
        })
        return res.status(200).send({
            message: 'Registro exitoso del aspirante',
            token: service.createToken(new_candidate)
        })
    })
}

function fromNumberToDocType(_number){
    _number = parseInt(_number);
    switch(_number){
        case 1:
            return "Cédula de Ciudadanía";
        case 2:
            return "Cédula de Ciudadanía Ecuatoriana";
        case 3:
            return "Cédula de Extranjería";
        case 4:
            return "Cédula de Guatemala";
        case 5:
            return "Cédula de Panamá";
        case 6:
            return "Código de Estudiante";
        case 7:
            return "Documento Nacional de Identidad";
        case 8:
            return "Documento Personal Identificación";
        case 9:
            return "Nro Único Identificación Personal";
        case 10:
            return "Otro";
        case 11:
            return "Pasaporte";
        case 12:
            return "Registro";
        default:
            return "Tarjeta de Identidad";
    }
    return "";
}

function fromNumberToGenre(_number){
    switch(_number){
        case 1:
            return "Masculino";
        case 2:
            return "Femenino";
        default: 
            return "Otro";
    }
    return "";
}
module.exports = {
    loadLoginCandidate,
    updateProfile,
    login,
    register
};


