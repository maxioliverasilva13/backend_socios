const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getRubrosXEmpresa, insertRubrosXEmpresa, deleteEmpresaRubro, getEmpresasRubro } = require("../controller/empresa_rubroController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/:id", [validarJWt], getRubrosXEmpresa);

router.get("/getEmpresaRubro/:id", [validarJWt], getEmpresasRubro);

router.post("/", [validarJWt],
    check('empresa', 'Datos obligatorio').not().isEmpty(),
    check('rubro_a', 'Datos obligatorio').not().isEmpty()
    ,
    validarCampos
    , insertRubrosXEmpresa);
router.delete("/", [validarJWt], deleteEmpresaRubro)


module.exports = router;



