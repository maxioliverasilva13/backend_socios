const express = require("express");
const { createEvent } = require("../controller/eventController");
const { validarJWt } = require("../middelwares/validar-jwt");
const router = express.Router();
const { check } = require("express-validator")
const { validarCampos } = require("../middelwares/validar-campos");
const { isDate } = require("../helpers/isDate");
const { createParticipant, getParticipants, isParticipant, getIDSUserParticipants, UpdateParticipants, isConfirmedParticipant, deleteParticipants } = require("../controller/participantsController");
/*
/api/events
*/

//le digo que la peticiones siguientes usen el jwt
router.use(validarJWt);


router.post("/", [
    check('uid', 'El uid es obligatorio').not().isEmpty(),
    check('eid', 'El eid es obligatorio').not().isEmpty(),
    validarCampos
], createParticipant);

router.get("/:id", getParticipants);

router.get("/getuidparticipants/:id", getIDSUserParticipants);


router.post("/isParticipant", isParticipant);

router.put("/", UpdateParticipants);

router.post("/isConfirmedParticipant", isConfirmedParticipant);

router.delete("/deleteParticipants", deleteParticipants)

module.exports = router;
