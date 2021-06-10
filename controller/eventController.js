const { response } = require("express");
const Evento = require("../models/EventsModel")
const createEvent = async (req, res = response) => {
    const evento = new Evento(req.body);
    console.log(evento)
    try {
        evento.user = req.uid;
        const eventoDB = await evento.save();
        console.log("jaja")

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
    try {
        const eventoDB = await Evento.find();
        res.json({
            ok: true,
            events: eventoDB,
        })
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

        const newEvent = {
            ...req.body,
            user: uid
        }
        const eventoActualizado = await Evento.findByIdAndUpdate(eventoID, newEvent, { new: true })

        return res.json({
            ok: true,
            eventoActualizado
        })
    } catch (error) {
    }
    res.json({
        ok: true,
        msg: "updateEvent"
    })
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


