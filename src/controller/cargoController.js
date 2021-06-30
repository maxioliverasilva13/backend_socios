const { request, response } = require("express")
const { User } = require("../entity/user")
const { Localidad } = require("../entity/localidad")
const { getRepository, Like } = require("typeorm");
const { Cargo } = require("../entity/cargo");


const getCargo = async (req = request, res = response) => {
    try {

        const cargos = await getRepository(Cargo).find();
        return res.json({
            ok: true,
            cargos
        })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const insertCargo = async (req = request, res = response) => {
    try {
        const cargo = await getRepository(Cargo).create(req.body)
        const resultado = await getRepository(Cargo).save(cargo);
        return (resultado.id) ?
            res.json({
                ok: true,
                msg: "Cargo añadido Correctamente"
            })
            :
            res.json({
                ok: true,
                msg: "No se pudo añadir su Cargo"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const updateCargo = async (req = request, res = response) => {
    try {
        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" });

    }
}
const deleteCargo = async (req = request, res = response) => {
    try {
        const cargo = await getRepository(Cargo).delete(req.params.id);
        res.json({
            ok: true,
            msg: "Cargo eliminado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}


module.exports = {
    getCargo,
    insertCargo,
    updateCargo,
    deleteCargo,
}
