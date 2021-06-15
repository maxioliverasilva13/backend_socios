const { response } = require("express");
const Participants = require("../models/ParticipantsModel")
const Evento = require("../models/EventsModel")
const Usuario = require("../models/UsuarioModel")

const createParticipant = async (req, res = response) => {
    const { uid: uidLogged } = req;
    const { uid, eid } = req.body;
    // const evento = new Participants(req.body);
    try {
        const user = await Usuario.findById(uid);
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Usuario no existe"
            })
        }
        const evento = await Evento.findById(eid);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }
        const participant = new Participants({ ...req.body, confirmed: (uid == uidLogged) });
        const participantDB = await participant.save();
        console.log("insertado");
        res.json({
            ok: true,
            msg: participantDB
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: "Usuario o usuario no existe2"
        })
    }
}


const getParticipants = async (req, res = response) => {
    const { id } = req.params;
    // const evento = new Participants(req.body);
    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }
        const participantes = await Participants.where({ eid: id });

        const results = await Promise.all(participantes.map(async (e) => {
            const user = await Usuario.findById(e.uid);
            return {
                name: user.name,
                id: user.id,
                urlPhoto: user.urlPhoto,
                email: user.email,
                confirmed: e.confirmed
            };
        }))
        if (results) {
            res.json({
                ok: true,
                participants: results
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: "Usuario o usuario no existe2"
        })
    }
}

const getIDSUserParticipants = async (req, res = response) => {
    const { id } = req.params;
    // const evento = new Participants(req.body);
    try {
        const evento = await Evento.findById(id);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "Evento no existe"
            })
        }
        const participantes = await Participants.where({ eid: id });

        const results = await Promise.all(participantes.map(async (e) => {
            return {
                uid: e.uid
            };
        }))
        if (results) {
            res.json({
                ok: true,
                participants: results
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: "Usuario o usuario no existe2"
        })
    }
}



const isConfirmedParticipant = async (req, res = response) => {
    const { uid, eid } = req.body;
    // const evento = new Participants(req.body);
    try {
        const evento = await Participants.find({ $and: [{ uid }, { eid }] })
        if (evento.length == 0) {
            return res.status(404).json({
                ok: false,
                msg: "No se encontro el participante para esta reunion"
            })
        }
        res.status(200).json({
            ok: (evento[0].confirmed),
            msg: "Se pudo"
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error consulte con el administrador"
        })
    }
}




const isParticipant = async (req, res = response) => {
    const { uid, eid } = req.body;
    try {
        const evento = await Participants.find({ $and: [{ uid }, { eid }] })
        res.status(200).json({
            ok: (evento.length > 0),
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: "Error consulte con el administrador"
        })
    }
}



const UpdateParticipants = async (req, res = response) => {
    const { oldParticipants, eid } = req.body;
    try {
        await oldParticipants.forEach(async eventInvit => {
            const eventoParticipants = await Participants.find({ $and: [{ eid }, { uid: eventInvit }] });
            if (!eventoParticipants || eventoParticipants.length == 0) {
                const participant = new Participants({ eid, uid: eventInvit, confirmed: false });
                const participantDB = await participant.save();
            }
        });
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: "Error al actualizar"
        })
    }
}

const deleteParticipants = async (req, res = response) => {
    const { uid, eid } = req.body;
    try {
        const eventoParticipants = await Participants.find({ $and: [{ eid }, { uid }] });
        if (eventoParticipants.length > 0) {
            const eventoBorrado = await Participants.findByIdAndDelete(eventoParticipants[0]._id);
            console.log(eventoBorrado);
            res.json({
                ok: true,
                msg: "Eliminado Correctamente"
            })
        } else {
            res.json({
                ok: false,
                msg: "Error al buscar participante"
            })
        }
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: "Error al actualizar"
        })
    }
}


module.exports = {
    getParticipants,
    createParticipant,
    isParticipant,
    getIDSUserParticipants,
    UpdateParticipants,
    isConfirmedParticipant,
    deleteParticipants
}