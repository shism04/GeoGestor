var express = require('express');
var router = express.Router();
var multer = require('multer');

const upload = multer({ dest: 'uploads/' });

var data = require('../data/dataProvider');
var reciver = require('../data/dataReciever');


router.get('/signin', function (req, res) {
  res.render("signIn");
});

router.post('/signin', async function (req, res) {
  const registerd_user = data.findUser(req.body.userEmail, req.body.pswd);
  if (registerd_user !== null) {
    req.session.login = true;
    req.session.user = registerd_user;
    res.redirect('/mapa');
  } else {
    res.redirect('/signin');
  }
});

router.get('/mapa', function (req, res, next) {
  if (!req.session.login) {
    res.redirect('/signin');
  } else res.render('map');
})

router.get('/api/geojson', function (req, res) {
  const pointsInterest = data.getAllPoints();
  res.json(pointsInterest);
})

router.post('/mapa/updatepunto', upload.single("imagen"), function (req, res) {
  if (!req.session.login) {
    res.redirect('/signin');
  } else {
    const { id, ...updates } = req.body;
    if (!id) {
      return res.status(400).json({ error: "El ID es obligatorio" });
    }
    const imagen = req.file ? req.file.path : null;
    if (imagen) {
      updates.imagen = imagen;
    }
    console.log(updates);
    reciver.updatePoint(id, updates);
    res.redirect('/mapa');
  }
})

router.post('/mapa/addpunto', upload.single("imagen"), function (req, res) {
  if (!req.session.login) {
    res.redirect('/signin');
  } else {
    const { longitud, latitud, ...properties } = req.body;
    const imagen = req.file ? req.file.path : null;
    if (imagen) {
      properties.imagen = imagen;
    }
    properties.senderos = properties.senderos == 1 ? "Si" : "No";
    reciver.insertPoint(properties, [longitud, latitud]);
    res.redirect('/mapa');
  }
})

router.get('/mapa/eliminarpunto/:id', function (req, res) {
  if (!req.session.login) {
    res.redirect('/signin');
  } else {
    reciver.eliminarPoint(req.params.id);
    res.redirect('/mapa');
  }
});


module.exports = router;
