const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { sendEmail } = require("../controller/sendEmail");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");


router.post("/", [validarJWt], sendEmail)


module.exports = router;



