const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { Localidad } = require("../entity/localidad");


const getNotifications = async (req = request, res = response) => {
    try {
        const notificaciones = await getRepository(Empleado).find({ where: { estado: false }, relations: ["cargo", "user", "empresa"] });
        const emprendedorEmpresa = await getRepository(Empleado).find({ where: { estado: null }, relations: ["cargo", "user", "empresa"] });
        return res.json({
            ok: true,
            notificaciones,
            empEmpresa: emprendedorEmpresa
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
        const notificaciones = await getRepository(Empleado).find({ where: { estado: false, empresa: req.params.empresa }, relations: ["cargo", "user", "empresa"] });
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
