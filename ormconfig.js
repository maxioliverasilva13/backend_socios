module.exports = {
    "type":process.env.SERVER_BDD_TYPE,
    "host": process.env.SERVER_BDD_HOST,
    "port": 5432,
    "username":process.env.SERVER_BDD_USER,
    "password": process.env.SERVER_BDD_PASSWORD,
    "database": process.env.SERVER_BDD_DATABASE,
    "entities": [
        "src/entity/*.js"
    ],
    "synchronize": true
}