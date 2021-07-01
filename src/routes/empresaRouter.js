const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getEmpresas, insertEmpresa, deleteEmpresa, updateEmpresa } = require("../controller/empresaController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", [validarJWt], getEmpresas);
router.post("/", [validarJWt],
    check('razon_social', 'Datos obligatorio').not().isEmpty(),
    check('rut', 'Datos obligatorio').not().isEmpty()
    ,
    validarCampos
    , insertEmpresa);
router.put("/:empresa", updateEmpresa)
router.delete("/:empresa", [validarJWt], deleteEmpresa)


module.exports = router;


