const express = require("express");
require("dotenv").config();
const cors = require("cors")
const morgan = require("morgan")
const { createConnection } = require("typeorm")
const bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
//creo server de express 
const app = express();
createConnection();
//bdd

//escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Server inciado en puerto ${process.env.PORT}`)
})
app.use(express.json())
app.use(cors())
app.use(morgan())
//user router
app.use("/user", require("./src/routes/userRouter"))
app.use("/rubroA", require("./src/routes/rubroARouter"))
app.use("/localidades", require("./src/routes/localidadRouter"))
app.use("/cargos", require("./src/routes/cargoRouter"))
app.use("/departamentos", require("./src/routes/departamentoRouter"))
app.use("/rubroempresa", require("./src/routes/empresa_rubroRouter"))
app.use("/empleados", require("./src/routes/empleadoRouter"))
app.use("/empresas", require("./src/routes/empresaRouter"))
app.use("/sendemail", require("./src/routes/sendemail"))

//lectura y parseo del body

//rutas auth


//directorio publico
app.use(express.static('public'))

