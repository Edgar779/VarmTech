const workspace = require('./workspace');

const express = require('express');
const router = express.Router();
const multer = require('multer');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const bodyParser = require('body-parser');
const db = require("../models");
const User = db.user;
const Op = db.Sequelize.Op;


router.use(passport.initialize());
router.use(passport.session());

router.use(bodyParser.urlencoded({ extended: false }));

router.use(bodyParser.json());



router.use(cookieParser());
router.use(express.static(__dirname + '../public'));




 router.post('/createCar', workspace.createCar);
 router.post('/deleteCar', workspace.deleteCar);
 router.post('/editCarOption', workspace.editCarOption);
 router.post('/getCars', workspace.getCars);

// router.get('/favicon.ico', (req, res) => res.status(204));


module.exports = router;
