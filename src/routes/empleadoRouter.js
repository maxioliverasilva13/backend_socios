const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getEmpleadosXEmpresa, insertEmpleado, deleetEmpleado, crearEmpleadoNuevo } = require("../controller/empleadoController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/:empresa", [validarJWt], getEmpleadosXEmpresa);
router.post("/newempleado", [validarJWt], crearEmpleadoNuevo)
router.post("/", [validarJWt],
    check('empresa', 'Datos obligatorio').not().isEmpty(),
    check('cargo', 'Datos obligatorio').not().isEmpty(),
    check('user', 'Datos obligatorio').not().isEmpty(),
    validarCampos,
    insertEmpleado
);
router.delete("/", [validarJWt], deleetEmpleado)


module.exports = router;
















