const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getRubroA, insertRubroA, updateRubroA, deleteRubroA } = require("../controller/rubro_actividadController");
const { validarCampos } = require("../middelwars.js/validar_campos");
const { validarJWt } = require("../middelwars.js/validar_jwr");

router.get("/", [validarJWt], getRubroA);
router.post("/", [validarJWt],
    check('name', 'Datos obligatorio').not().isEmpty()
    ,
    validarCampos,
    insertRubroA);
router.put("/:id", [validarJWt], updateRubroA)
router.delete("/:id", [validarJWt], deleteRubroA)

module.exports = router;



