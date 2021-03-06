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
        const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = id;
        req.name = name;
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