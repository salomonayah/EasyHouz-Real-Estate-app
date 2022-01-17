// IMPORT DEPENDENCIES ===================================================
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path"); 
const constants = require('./constants/constantsValue'); // Project constants

//IMPORT ROUTERS ==========================================================
const userRouter = require("./routes/userRoute");

// set a port & execute Express  ==========================================
const PORT = constants.serverPort; 
const app = express();


// SET MIDDLEWARE =========================================================
app.use(bodyParser.json()) // use Json like body

app.use(bodyParser.urlencoded({ extended: false})) // Using default ULR encoded body

app.use((req, res, next) => { // Header setting
    // Avoid Cors
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    // Header Accepted
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Methods Accepted
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");

    next()
})

// Middleware allow access to the images folder on server 
// for all request starting from this route /images
app.use("/images", express.static(path.join("/ifisunBackend/images"))) 


// SET ROUTES ============================================================================
app.use("/api/user", userRouter); 


// Connect to database and start server ===================================================
mongoose.connect("mongodb+srv://"+ constants.dbUserName +":"+ constants.dbPassword +"@cluster0.um1ef.mongodb.net/learnNodeJsCourse?&w=majority", { useNewUrlParser: true })
.then(
    ()=> {
        console.log("Connection to Database done !!! ") 
        // EXPOSE THE SERVER =====================================================================
        app.listen(PORT, () => { console.log("listening on port " + PORT) })
    }
)
.catch(
    (error) => {  
        console.log("Connection failed !!! ");
        console.log(error) 
    }
)