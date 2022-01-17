// keep on mind that we can use nodemon.json file in the directory with package.json to save global variable
// then nodemon.json data can be used by calling process Example: process.env.serverPort

// but here we prefer to use constants data
const constants = {
    serverPort : 3030,
    jwtSecret: "wef3n5jk426vd98dd7gfg8df",
    dbUserName : "salomonayah",
    dbPassword : "zOgGMrRJuZnoWIOh"

} 

module.exports = constants