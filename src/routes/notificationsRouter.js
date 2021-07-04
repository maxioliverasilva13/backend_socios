const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getNotifications, getNotificationsXEmpresa } = require("../controller/notificationsController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", getNotifications);

router.get("/empresa/:empresa", getNotificationsXEmpresa);


module.exports = router;



