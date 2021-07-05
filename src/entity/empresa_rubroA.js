var EntitySchema = require("typeorm").EntitySchema;

const EmpresaRubroA = new EntitySchema({
    name: "empresa_rubro_a",
    tableName: "empresa_rubro_a",
    columns: {

    },
    relations: {
        rubro_a: {
            primary: true,
            type: 'many-to-one',
            target: 'rubro_a',
            joinColumn: true,
            cascade: true,
            onDelete: "CASCADE"
        },
        empresa: {
            primary: true,
            type: 'many-to-one',
            target: 'empresa',
            joinColumn: true,
            cascade: true,
            onDelete: "CASCADE"
        },
    }

});


module.exports = {
    EmpresaRubroA
}