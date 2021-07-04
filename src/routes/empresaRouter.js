const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getEmpresas, insertEmpresa, deleteEmpresa, updateEmpresa, searchEmpresa, searchEmpresaAndEmpleado, getDataEmpresa } = require("../controller/empresaController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", [validarJWt], getEmpresas);
router.post("/", [validarJWt],
    check('razon_social', 'Datos obligatorio').not().isEmpty(),
    check('rut', 'Datos obligatorio').not().isEmpty()
    ,
    validarCampos
    , insertEmpresa);
router.post("/",
    insertEmpresa);
router.get("/getdataEmpresa/:empresa", [validarJWt], getDataEmpresa)
router.put("/:empresa", updateEmpresa);
router.get("/search/:text", [validarJWt], searchEmpresa)
router.post("/searchandempl/:text", [validarJWt], searchEmpresaAndEmpleado)
router.delete("/:empresa", [validarJWt], deleteEmpresa)


module.exports = router;



