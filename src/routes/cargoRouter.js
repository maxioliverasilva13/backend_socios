const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getCargo, insertCargo, updateCargo, deleteCargo } = require("../controller/cargoController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", [validarJWt], getCargo);
router.post("/", [validarJWt],
    check('name', 'Datos obligatorio').not().isEmpty(),
    validarCampos,
    insertCargo);
router.put("/:id", [validarJWt], updateCargo)
router.delete("/:id", [validarJWt], deleteCargo)
module.exports = router;



