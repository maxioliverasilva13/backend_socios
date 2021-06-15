const express = require("express");
const { createEvent, getEventos, updateEvent, deleteEvent } = require("../controller/eventController");
const { validarJWt } = require("../middelwares/validar-jwt");
const router = express.Router();
const { check } = require("express-validator")
const { validarCampos } = require("../middelwares/validar-campos");
const { isDate } = require("../helpers/isDate");
/*
/api/events
*/

//le digo que la peticiones siguientes usen el jwt
router.use(validarJWt);

router.get("/"
    , getEventos);

router.post("/", [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion obligatoria').custom(isDate),
    check('tipo', 'tipo es obligatoria').not().isEmpty(),
    validarCampos
], createEvent);


router.put("/:id", [validarCampos], updateEvent);

router.delete("/:id", [validarCampos], deleteEvent)


module.exports = router;
