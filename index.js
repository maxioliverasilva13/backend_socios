const express = require("express");
require("dotenv").config();
const cors = require("cors")
const morgan = require("morgan")
const { createConnection } = require("typeorm")
const bodyParser = require('body-parser')
var nodemailer = require('nodemailer');
const { JsonWebTokenError } = require("jsonwebtoken");
//creo server de express 
const app = express();
createConnection();
//bdd


const Lob = require("lob")("test_3f89d77f0c74a2b1e63fd64572623188b33")
console.log(Lob.addresses.list())



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
app.use("/notificaciones", require("./src/routes/notificationsRouter"))

//lectura y parseo del body

//rutas auth


//directorio publico
app.use(express.static('public'))

