const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { deleteDepartamento, updateDepartamento, getDepartamento, insertDepartamento } = require("../controller/departamentoController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", [validarJWt], getDepartamento);
router.post("/",
    check('name', [validarJWt], 'Datos obligatorio').not().isEmpty(),
    validarCampos,
    insertDepartamento);
router.put("/:id", [validarJWt], updateDepartamento)
router.delete("/:id", [validarJWt], deleteDepartamento)
module.exports = router;



