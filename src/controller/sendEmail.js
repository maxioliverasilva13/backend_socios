const { request, response } = require("express")
const { getRepository, Like } = require("typeorm");
const router = require("../routes/userRouter");
var nodemailer = require('nodemailer');


const sendEmail = async(req = request, res = response) => {
    try {
        const { email, texto } = req.body;
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
            to: email,
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
                                                <img align="center" border="0" src="https://res.cloudinary.com/dkjujr3gj/image/upload/v1627940437/mzvalte32ydjjypi6zrs.jpg" alt="Image" title="Image"
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
                                                style="line-height: 22.4px; font-size: 16px;">Desde el Centro comercial San
                                                Jos&eacute; te deseamos un muy feliz cumplea&ntilde;os</span></span></p>
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
                                        style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:georgia,palatino;"
                                        align="left">
                                        <div style="line-height: 140%; text-align: center; word-wrap: break-word;">
                                          <p style="font-size: 14px; line-height: 140%;">` + texto + `</p>
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
                                          <p style="font-size: 14px; line-height: 140%;">Contacto: info@ccisanjose.com.uy</p>
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

        transporter.sendMail(mailOptions, function(error, info) {
            console.log(info)
            if (error) {
                console.log(error);
                return res.status(500).json({ error: error.message });
            } else {
                console.log("Email enviado");
                return res.status(500).json({ ok: true, msg: "Correo Enviado" });
            }
        });
        return res.json({ ok: true })

    } catch (error) {
        return res.json({ ok: false })
    }


}

module.exports = {
    sendEmail,
}