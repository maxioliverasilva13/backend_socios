const { response } = require("express");
const Evento = require("../models/EventsModel");
const Participants = require("../models/ParticipantsModel");
const createEvent = async (req, res = response) => {
    const evento = new Evento(req.body);
    try {
        evento.user = req.uid;
        const eventoDB = await evento.save();
        res.json({
            ok: true,
            msg: eventoDB,
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: error
        })
    }
}


const getEventos = async (req, res = response) => {
    const uid = req.uid;
    try {
        const eventoDB = await Evento.find();
        const newEvents = [];
        await Promise.all(eventoDB.map(async (evento) => {
            const participants = await Participants.find({ $and: [{ uid }, { eid: evento.id }] });
            if (participants.length > 0) {
                newEvents.push(evento)
            }
        }));
        if (newEvents) {
            res.json({
                ok: true,
                events: newEvents,
            })
        } else {
            res.json({
                ok: false,
                msg: "No hay eventos por mostrar"
            })
        }

    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: error
        })
    }

}


const updateEvent = async (req, res = response) => {
    const eventoID = req.params.id;
    const uid = req.uid;
    console.log(uid);
    console.log(eventoID)
    try {
        console.log(req.body)
        const evento = await Evento.findById(eventoID);
        console.log("jaja")

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "El id no existe"
            })
        }
        const eventoParticipants = await Participants.find({ $and: [{ uid }, { eid: evento.id }] })
        if (eventoParticipants.lenght <= 0) {
            return res.status(401).json({
                ok: false,
                msg: "Privilegios insuficientes"
            })
        }

        const newEvent = {
            ...req.body,
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, newEvent, { new: true })
        await eventoActualizado.save()
        return res.json({
            ok: true,
            eventoActualizado
        })
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: "No se pudo"
        })
    }

}

const deleteEvent = async (req, res = response) => {
    const eventoID = req.params.id;
    const uid = req.uid;
    try {
        const evento = await Evento.findById(eventoID);
        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: "El id no existe"
            })
        } if (evento.user.toString() !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "Privilegios insuficientes"
            })
        }

        const eventoActualizado = await Evento.findByIdAndDelete(eventoID)

        return res.json({
            ok: true,
            msg: "Evento Eliminado"
        })
    } catch (error) {
    }
    res.json({
        ok: true,
        msg: "updateEvent"
    })
}





module.exports = {
    createEvent,
    getEventos,
    updateEvent,
    deleteEvent
}


