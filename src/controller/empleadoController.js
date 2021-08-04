const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const { Cargo } = require("../entity/cargo");
const { Departamento } = require("../entity/departamento");
const { Empleado } = require("../entity/empleado");
const { Empresa } = require("../entity/empresa");
const { Localidad } = require("../entity/localidad");
const { User } = require("../entity/user");
var nodemailer = require('nodemailer');

const getEmpleadosXEmpresa = async (req = request, res = response) => {
    try {
        const empleados = await getRepository(Empleado).find({ relations: ["cargo", "user", "empresa"], where: { empresa: req.params.empresa } });
        const empleadosComplete = await Promise.all(empleados.map(async e => {
            const locUser = await getRepository(User).findOne({ relations: ["localidad", "rol"], where: { id: e?.user?.id } })
            const localidad = await getRepository(Localidad).findOne({ relations: ["departamento"], where: { id: locUser?.localidad?.id } })
            return {
                ...e,
                user: { ...e.user, rol: locUser.rol },
                localidad
            }

        }))
        return res.json({
            ok: true,
            empleados: empleadosComplete
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador" })
    }
}
const insertEmpleado = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).findOne(req.body.empresa);
        const cargo = await getRepository(Cargo).findOne(req.body.cargo);
        const user = await getRepository(User).findOne(req.body.user);

        if (!user || !cargo || !empresa) {
            return res.json({
                ok: false,
                msg: "Empresa,cargo o usuario incorrecto"
            })
        }

        const empleado = await getRepository(Empleado).create(req.body);
        const resultado = await getRepository(Empleado).save(empleado);
        return (resultado) ?
            res.json({
                ok: true,
                msg: "Empleado añadido Correctamente a esta empresa"
            })
            :
            res.json({
                ok: false,
                msg: "No se pudo añadir su empleado a esta empresa"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador" })
    }
}


const crearEmpleadoNuevo = async (req = request, res = response) => {
    try {
        console.log(req.body)
        const empresa = await getRepository(Empresa).findOne(req.body.empresa);
        const cargo = await getRepository(Cargo).findOne(req.body.cargo);
        const locality = await getRepository(Localidad).findOne(req.body.localidad);
        const userEmail = await getRepository(User).findOne({ email: req.body.email });
        if (userEmail) {
            return res.json({
                ok: false,
                msg: "El email ya existe"
            })
        }

        const Newuser = await getRepository(User).create({ ...req.body });
        const NewUserCreated = await getRepository(User).save(Newuser);

        if (!NewUserCreated || !cargo || !empresa || !locality) {
            return res.json({
                ok: false,
                msg: "Empresa,cargo o usuario incorrecto",

            })
        }
        const empleado = await getRepository(Empleado).create({ cargo: req.body.cargo, empresa: req.body.empresa, user: Newuser.id, estado: true });
        const resultado = await getRepository(Empleado).save(empleado);

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
            to: req.body.email,
            html: `<!DOCTYPE HTML
            PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml"
            xmlns:o="urn:schemas-microsoft-com:office:office">
          
          <head>
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="x-apple-disable-message-reformatting">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <title></title>
          
            <style type="text/css">
              table,
              td {
                color: #000000;
              }
          
              a {
                color: #0000ee;
                text-decoration: underline;
              }
          
              @media only screen and (min-width: 620px) {
                .u-row {
                  width: 600px !important;
                }
          
                .u-row .u-col {
                  vertical-align: top;
                }
          
                .u-row .u-col-100 {
                  width: 600px !important;
                }
          
              }
          
              @media (max-width: 620px) {
                .u-row-container {
                  max-width: 100% !important;
                  padding-left: 0px !important;
                  padding-right: 0px !important;
                }
          
                .u-row .u-col {
                  min-width: 320px !important;
                  max-width: 100% !important;
                  display: block !important;
                }
          
                .u-row {
                  width: calc(100% - 40px) !important;
                }
          
                .u-col {
                  width: 100% !important;
                }
          
                .u-col>div {
                  margin: 0 auto;
                }
              }
          
              body {
                margin: 0;
                padding: 0;
              }
          
              table,
              tr,
              td {
                vertical-align: top;
                border-collapse: collapse;
              }
          
              p {
                margin: 0;
              }
          
              .ie-container table,
              .mso-container table {
                table-layout: fixed;
              }
          
              * {
                line-height: inherit;
              }
          
              a[x-apple-data-detectors='true'] {
                color: inherit !important;
                text-decoration: none !important;
              }
            </style>
          
          
          
          </head>
          
          <body class="clean-body"
            style="margin: 0;padding: 0;-webkit-text-size-adjust: 100%;background-color: #f9f9f9;color: #000000">
          
            <table
              style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #f9f9f9;width:100%"
              cellpadding="0" cellspacing="0">
              <tbody>
                <tr style="vertical-align: top">
                  <td style="word-break: break-word;border-collapse: collapse !important;vertical-align: top">
          
                    <div class="u-row-container" style="padding: 0px;background-color: transparent">
                      <div class="u-row"
                        style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                        <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          
                          <div class="u-col u-col-100"
                            style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                            <div style="width: 100% !important;">
                              <div
                                style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
          
                                <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                  width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:georgia,palatino;"
                                        align="left">
          
                                        <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0" width="19%"
                                          style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                          <tbody>
                                            <tr style="vertical-align: top">
                                              <td
                                                style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                <span>&#160;</span>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
          
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
          
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
          
          
                      <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                          style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                          <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
          
                            <div class="u-col u-col-100"
                              style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                <div
                                  style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
          
          
                      <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                          style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                          <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                              style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                <div
                                  style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
          
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:8px;font-family:georgia,palatino;"
                                          align="left">
          
                                          <table height="0px" align="center" border="0" cellpadding="0" cellspacing="0"
                                            width="19%"
                                            style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;mso-table-lspace: 0pt;mso-table-rspace: 0pt;vertical-align: top;border-top: 1px solid #f9f9f9;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                            <tbody>
                                              <tr style="vertical-align: top">
                                                <td
                                                  style="word-break: break-word;border-collapse: collapse !important;vertical-align: top;font-size: 0px;line-height: 0px;mso-line-height-rule: exactly;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%">
                                                  <span>&#160;</span>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
          
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
          
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
          
          
                      <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                          style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                          <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                              style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                <div
                                  style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
          
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:georgia,palatino;"
                                          align="left">
          
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                              <td style="padding-right: 0px;padding-left: 0px;" align="center">
                                                <a href="https://appsocios.herokuapp.com/" target="_blank">
                                                  <img align="center" border="0" src="https://res.cloudinary.com/dkjujr3gj/image/upload/v1627940437/mzvalte32ydjjypi6zrs.jpg" alt="Image"
                                                    title="Image"
                                                    style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;"
                                                    width="600" />
                                                </a>
                                              </td>
                                            </tr>
                                          </table>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
          
          
                      <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                          style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                          <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                              style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                <div
                                  style="padding: 30px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
          
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:georgia,palatino;"
                                          align="left">
          
                                          <div
                                            style="color: #3d3030; line-height: 140%; text-align: center; word-wrap: break-word;">
                                            <p style="font-size: 14px; line-height: 140%;"><span
                                                style="font-size: 16px; line-height: 22.4px;"><span
                                                  style="line-height: 22.4px; font-size: 16px;">HOLA TU USUARIO FUE REGISTRADO
                                                  CORRECTAMENTE</span></span></p>
                                          </div>
          
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
          
          
                      <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                          style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: #ffffff;">
                          <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                              style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                <div
                                  style="padding: 1px 0px 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:0px 10px;font-family:georgia,palatino;"
                                          align="left">
                                          <div
                                            style="color: #236fa1; line-height: 130%; text-align: center; word-wrap: break-word;">
                                            <p style="font-size: 14px; line-height: 130%;"><span
                                                style="font-size: 20px; line-height: 26px;"><span
                                                  style="line-height: 26px; font-size: 20px;">No olvidar usuario ni
                                                  contrase&ntilde;a, no compartir el mismo</span></span></p>
                                          </div>
          
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
          
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:georgia,palatino;"
                                          align="left">
          
                                          <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                            <p style="font-size: 14px; line-height: 140%;"><span
                                                style="font-size: 30px; line-height: 42px;">Usuario: ${req.body.email}</span></p>
                                          </div>
          
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
          
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:georgia,palatino;"
                                          align="left">
          
                                          <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                            <p style="font-size: 14px; line-height: 140%;"><span
                                                style="font-size: 30px; line-height: 42px;">Contrase&ntilde;a:${req.body.password}</span></p>
                                          </div>
          
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
          
                                </div>
          
                              </div>
                            </div>
          
                          </div>
                        </div>
                      </div>
          
          
          
                      <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                          style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                          <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                              style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                <div
                                  style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
          
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:0px;font-family:georgia,palatino;"
                                          align="left">
          
                                          <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                            <tr>
                                              <td style="padding-right: 0px;padding-left: 0px;" align="center">
          
                                                <img align="center" border="0" src="https://res.cloudinary.com/dkjujr3gj/image/upload/v1627940424/jjj3khndtysrllspcel4.jpg" alt="Image" title="Image"
                                                  style="outline: none;text-decoration: none;-ms-interpolation-mode: bicubic;clear: both;display: inline-block !important;border: none;height: auto;float: none;width: 100%;max-width: 600px;"
                                                  width="600" />
          
                                              </td>
                                            </tr>
                                          </table>
          
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
          
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
          
          
                      <div class="u-row-container" style="padding: 0px;background-color: transparent">
                        <div class="u-row"
                          style="Margin: 0 auto;min-width: 320px;max-width: 600px;overflow-wrap: break-word;word-wrap: break-word;word-break: break-word;background-color: transparent;">
                          <div style="border-collapse: collapse;display: table;width: 100%;background-color: transparent;">
                            <div class="u-col u-col-100"
                              style="max-width: 320px;min-width: 600px;display: table-cell;vertical-align: top;">
                              <div style="width: 100% !important;">
                                <div
                                  style="padding: 0px;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;">
          
                                  <table style="font-family:georgia,palatino;" role="presentation" cellpadding="0" cellspacing="0"
                                    width="100%" border="0">
                                    <tbody>
                                      <tr>
                                        <td
                                          style="overflow-wrap:break-word;word-break:break-word;padding:19px 10px 10px;font-family:georgia,palatino;"
                                          align="left">
          
                                          <div
                                            style="color: #7f87a7; line-height: 140%; text-align: center; word-wrap: break-word;">
                                            <p style="font-size: 14px; line-height: 140%;">&copy; 2021 All Rights Reserved</p>
                                          </div>
          
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
          
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
          
          
                  </td>
                </tr>
              </tbody>
            </table>
          </body>
          
          </html>`

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


        //send email
        return (resultado) ?
            res.json({
                ok: true,
                msg: "Empleado añadido Correctamente a esta empresa"
            })
            :
            res.json({
                ok: true,
                msg: "No se pudo añadir su empleado a esta empresa"
            })

    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador" })
    }
}

// router.post("/:text", searchUser);


const allowEmployed = async (req = request, res = response) => {
    try {
        const empresa = await getRepository(Empresa).findOne(req.body.empresa);
        const cargo = await getRepository(Cargo).findOne(req.body.cargo);
        const user = await getRepository(User).findOne(req.body.user);

        if (!user || !cargo || !empresa) {
            return res.json({
                ok: false,
                msg: "Empresa,cargo o usuario incorrecto"
            })
        }
        else {
            await getRepository(Empleado).update({ user: req.body.user, empresa: req.body.empresa, cargo: req.body.cargo }, { ...req.body, estado: true });
            return res.json({ ok: true, msg: "Empleado añadido a la empresa" })
        }
    } catch (error) {
        console.log(error)
    }
}


const searchEmpleado = async (req = request, res = response) => {
    const { text, empresa } = req.body;
    try {
        const usuarios = await getRepository(User).find({ relations: ["rol", "localidad"], where: [{ name: Like(`%${text.toString()}%`) }, { email: Like(`%${text.toString()}%`) }, { last_name: Like(`%${text.toString()}%`) }] })
        const empleadosFIlter = Promise.all(usuarios.map(async e => {
            const empleado = await getRepository(Empleado).findOne({ where: { user: e.id, empresa: empresa }, relations: ["user", "cargo", "empresa"] })
            return (empleado) ? { empleado, rol: e.rol, localidad: e.localidad } : null

        }))
        const empleados = await (await empleadosFIlter).filter(e => e != null);
        res.json({ ok: true, empleados })
    } catch (error) {
        console.log(error);
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }

}


const deleetEmpleado = async (req = request, res = response) => {
    try {
        const empresaRubro = await getRepository(Empleado).createQueryBuilder()
            .delete()
            .where("user = :id and empresa= :id2 and cargo = :id3", { id: req.body.user, id2: req.body.empresa, id3: req.body.cargo })
            .execute();
        res.json({
            ok: true,
            msg: "Empleado eliminado correctamente"
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador" })
    }
}


const getEmpleadoSolicitudes = async (req = request, res = response) => {
    try {
        const empleos = await getRepository(Empleado).find({ relations: ["empresa"], where: { user: req.params.user } })
        return res.json({
            ok: true,
            empleos
        })
    } catch (error) {
        console.log(error)
        res.json({ ok: false, msg: "Consulte con el desarrollador" })
    }
}

const upadteEmpleado = async (req = request, res = response) => {
    try {
        const usuario = await getRepository(User).findOne({ where: { id: req.body.user }, relations: ["rol", "localidad"] });
        if (!usuario) {
            return res.json({
                ok: false,
                msg: "No existe el usuario que desea editar"
            })
        } else {
            await getRepository(Empleado).update({ user: req.body.user, cargo: req.body.cargo, empresa: req.body.empresa }, { ...req.body });

            const newUser = await getRepository(User).findOne({ where: { id: req.params.id }, relations: ["rol", "localidad"] });

            return res.json({ ok: true, newUser })
        }
    } catch (error) {
        console.log(error)
        return res.json({ ok: false, msg: "Contacte con el desarrollador" })
    }
}

module.exports = {
    getEmpleadosXEmpresa,
    insertEmpleado,
    deleetEmpleado,
    crearEmpleadoNuevo,
    getEmpleadoSolicitudes,
    allowEmployed,
    searchEmpleado,
    upadteEmpleado
}
