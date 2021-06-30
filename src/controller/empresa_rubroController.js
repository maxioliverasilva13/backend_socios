const { request, response } = require("express")
const { EmpresaRubroA } = require("../entity/empresa_rubroA")
const { getRepository, Like } = require("typeorm");
const { Empresa } = require("../entity/empresa");
const { RubroA } = require("../entity/rubro_actividad");


const getRubrosXEmpresa = async (req = request, res = response) => {
    try {
        const rubrosXEmpresa = await getRepository(EmpresaRubroA).find({ relations: ["rubro_a"], where: { empresa: req.params.id } })
        return res.json({
            ok: true,
            rubros: rubrosXEmpresa
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}
const insertRubrosXEmpresa = async (req = request, res = response) => {
    const { empresa: empresaId, rubroA } = req.body;
    try {
        const empresa = await getRepository(Empresa).findOne(empresaId);
        const rubro = await getRepository(RubroA).findOne(rubroA);
        if (!empresa || !rubro) {
            return res.json({
                ok: false,
                msg: "Empresa o rubro incorrecto"
            })
        }
        const rubroEmpresa = await getRepository(EmpresaRubroA).create(req.body)
        const resultado = await getRepository(EmpresaRubroA).save(rubroEmpresa);
        return (resultado) ?
            res.json({
                ok: true,
                msg: "Rubro añadido Correctamente a esta empresa"
            })
            :
            res.json({
                ok: true,
                msg: "No se pudo añadir su Rubro a esta empresa"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}

const deleteEmpresaRubro = async (req = request, res = response) => {
    try {
        const empresaRubro = await getRepository(EmpresaRubroA).createQueryBuilder()
            .delete()
            .where("rubro_a = :id and empresa= :id2", { id: req.body.rubro_a, id2: req.body.empresa })
            .execute();
        res.json({
            ok: true,
            msg: "Departamento eliminado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador hermoso" })
    }
}


module.exports = {
    getRubrosXEmpresa,
    insertRubrosXEmpresa,
    deleteEmpresaRubro
}
