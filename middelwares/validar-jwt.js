const { response, request } = require("express")
const jwt = require("jsonwebtoken");
const validarJWt = (req = request, res = response, next) => {
    //x-token headers

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "No esta autenticado"
        })
    }

    try {
        const { uid, name, urlPhoto } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        console.log(urlPhoto)
        req.uid = uid;
        req.name = name;
        req.urlPhoto = urlPhoto;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Token no valido"
        })
    }

    //console.log(token);
    next();
}

module.exports = {
    validarJWt
}