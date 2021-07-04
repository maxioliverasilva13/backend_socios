const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { Localidad } = require("../entity/localidad");


const getNotifications = async (req = request, res = response) => {
    try {
        const notificaciones = await getRepository(Empleado).find({ where: { estado: false } });
        return res.json({
            ok: true,
            notificaciones
        })
    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            msg: "Error al obtener las notificaciones"
        })
    }
}

const getNotificationsXEmpresa = async (req = request, res = response) => {
    try {
        const notificaciones = await getRepository(Empleado).find({ where: { estado: false, empresa: req.params.empresa } });
        return res.json({
            ok: true,
            notificaciones
        })
    } catch (error) {
        console.log(error)
        return res.json({
            ok: false,
            msg: "Error al obtener las notificaciones"
        })
    }
}

module.exports = {
    getNotifications,
    getNotificationsXEmpresa
}
