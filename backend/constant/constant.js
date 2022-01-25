const dbCredentials = {
    dbUserName : "braintechtest",
    dbPassword : "z6OJzN6N4Fwiktu3"
}
// 154.113.86.66/32 cluster IP Ad

const constants = {
    serverPort : 3030,
    jwtSecret: "wef3n5jk426vd98dd7gfg8df",
    bd: 'mongodb+srv://'+dbCredentials.dbUserName+':'+ dbCredentials.dbPassword+'@cluster0.ovi5p.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
} 



module.exports = constants;
