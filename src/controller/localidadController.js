const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Localidad } = require("../entity/localidad");
const { Departamento } = require("../entity/departamento");


const getLocalidad = async (req = request, res = response) => {
    try {

        const localidades = await getRepository(Localidad).find();
        return res.json({
            ok: true,
            localidades: localidades
        })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const getLocalidadXDep = async (req = request, res = response) => {
    try {
        const localidades = await getRepository(Localidad).find({ where: { departamento: req.params.id }, relations: ["departamento"] });
        return res.json({
            ok: true,
            localidades: localidades
        })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const insertLocalidad = async (req = request, res = response) => {
    try {
        const departamento = await getRepository(Departamento).findOne(req.body.departamento);
        if (!departamento) {
            return res.json({
                ok: false,
                msg: "El departamento no existe"
            })
        }
        const localidad = await getRepository(Localidad).create(req.body)
        const resultado = await getRepository(Localidad).save(localidad);
        return (resultado.id) ?
            res.json({
                ok: true,
                msg: "Localidad añadido Correctamente"
            })
            :
            res.json({
                ok: true,
                msg: "No se pudo añadir su Localdad"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const updateLocalidad = async (req = request, res = response) => {
    try {
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const deleteLocalidad = async (req = request, res = response) => {
    try {
        const localidad = await getRepository(Localidad).delete(req.params.id);
        res.json({
            ok: true,
            msg: "Rubro eliminado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}


module.exports = {
    getLocalidad,
    insertLocalidad,
    updateLocalidad,
    deleteLocalidad,
    getLocalidadXDep
}
