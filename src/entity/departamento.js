var EntitySchema = require("typeorm").EntitySchema;

const Departamento = new EntitySchema({
    name: "departamento",
    tableName: "departamento",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
            cascade: true,
            onDelete: "CASCADE"
        },
        name: {
            type: "varchar",
        },

    },
});


module.exports = {
    Departamento
}