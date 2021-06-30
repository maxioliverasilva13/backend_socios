var EntitySchema = require("typeorm").EntitySchema;

const Empleado = new EntitySchema({
    name: "empleado",
    tableName: "empleado",
    columns: {
        estado: {
            type: "bool",
        }
    },
    relations: {
        cargo: {
            primary: true,
            type: 'many-to-one',
            target: 'cargo',
            joinColumn: true,
            cascade: true,
            onDelete: "CASCADE"
        },
        user: {
            primary: true,
            type: 'many-to-one',
            target: 'users',
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
    Empleado
}