const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const router = require("../routes/userRouter");
var nodemailer = require('nodemailer');


const sendEmail = async (req = request, res = response) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'maximiliano.olivera@atticalabs.com',
            pass: 'olivermanmaxi'
        }
    });

    var mailOptions = {
        from: 'Remitente',
        to: 'martin.coimbra.2017@gmail.com',
        html: `<div style="width: 100%; max-width:100%;background: rgba(178, 221, 178, 0.585);">
        <div
            style=" font-family: verdana;width: 100%; background: #77bd7f; display: flex;flex-direction: row;justify-content: center;">
            <h1 style="color: white ;font-size: 20px;">TEAM GRUPO 6</h1>
        </div>
        <p style=" padding: 10px;font-size: 17px; color: gray;font-weight: 700;">Confirmacion Correo Electronico</p>
        <div style="padding: 10px;width: 100%;color: gray;">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Aspernatur,
            adipisci natus. Facere illum, consequuntur magni aliquam id nostrum doloremque exercitationem aspernatur
            facilis nemo, magnam voluptatum. Quisquam voluptate ea sunt quis?
        </div>
    </div>`

    };

    transporter.sendMail(mailOptions, function (error, info) {
        console.log(info)
        if (error) {
            console.log(error);
            return res.status(500).json({ error: error.message });
        } else {
            console.log("Email enviado");
            return res.status(500).json({ ok: true, msg: "Correo Enviado" });
        }
    });


}

module.exports = {
    sendEmail,
}
