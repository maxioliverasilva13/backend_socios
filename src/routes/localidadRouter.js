const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getLocalidad, deleteLocalidad, updateLocalidad, insertLocalidad, getLocalidadXDep } = require("../controller/localidadController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", [validarJWt], getLocalidad);
router.get("/departamento/:id", getLocalidadXDep);
router.post("/", [validarJWt],
    check('name', 'Datos obligatorio').not().isEmpty()
    ,
    validarCampos,
    insertLocalidad);
router.put("/:id", [validarJWt], updateLocalidad)
router.delete("/:id", [validarJWt], deleteLocalidad)

module.exports = router;



