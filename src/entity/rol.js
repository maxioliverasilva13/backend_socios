var EntitySchema = require("typeorm").EntitySchema;

const Rol = new EntitySchema({
    name: "rol",
    tableName: "rol",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar",
        },
    },


});


module.exports = {
    Rol
}