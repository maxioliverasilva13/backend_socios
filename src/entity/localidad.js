var EntitySchema = require("typeorm").EntitySchema;

const Localidad = new EntitySchema({
    name: "localidad",
    tableName: "localidad",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },
        name: {
            type: "varchar",
        },
    },
    relations: {
        departamento: {
            type: 'many-to-one',
            target: 'departamento',
            joinColumn: true,
            cascade: true,
            onDelete: "CASCADE"
        },

    }
});


module.exports = {
    Localidad
}