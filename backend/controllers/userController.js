
const bcrypt =  require("bcrypt") // to encrypt the password
const jwt = require("jsonwebtoken") // to provide the token

// IMPORT MODELS ================================================
const UserModel = require("../models/userModel")

// IMPORT UTILS FUNCTION ========================================
const provideAnId = require("../utils/utils_functions")

exports.signUpController = (req, resp, next) => {  
    
    // encrypt the password first 
    bcrypt.hash(req.body.password, 10)
    .then ( (passwordEncrypted) => {
        const backendServerDirectoryAddress = req.protocol + "://" + req.get("host")

        const newUser =  new UserModel({ //creating new object from existing model
            firstName : req.body.firstName,
            lastName :  req.body.lastName,
            email :  req.body.email,
            phoneNumber :  req.body.phoneNumber,
            country : req.body.country,
            city :  req.body.city,
            sex: req.body.sex,
            profileImagePath: backendServerDirectoryAddress + "/images/" + req.file.filename,
            password: passwordEncrypted
        });

        newUser.save() // save a new document in the collection

        .then(
            (mongoDocuments) => {  

                console.log("New user account created !");
                console.log( { data : provideAnId(mongoDocuments) } );

                resp.status(200).json(
                    { data : provideAnId(mongoDocuments)}
                ) 
            }
        )
        .catch (
            (error) => {
                console.log("New user account saving error !!!");
                console.log(error.message);

                resp.status(500).json({
                    message : "Error while creating the new user"
                }) 
            }
        );
    })
    .catch (
        (error) => {
            console.log("Error Password can't be encrypted !");
            console.log(error.message);

            resp.status(500).json({
                message : "Error while creating the new user"
            }) 
        }
    );
}

exports.signInController = (req, resp, next) => {

    let userFound;

    UserModel.findOne({ email: req.body.email })
    .then((user) => {

        if(!user) {
            return resp.status(401).json({
                message: "auth failed"
            });
        }
        userFound = user;

        return bcrypt.compare(req.body.password, user.password);

    })
    .then((result) => {

        if (!result) {
            return resp.status(401).json({
                message: "auth failed"
            });
        }

        const connectionPayload = { email: userFound.email, userId: userFound._id  } 
        const jwtSecret = "wef3n5jk426vd98dd7gfg8df" // a kind of password defined by backend team 
        const expiration = { expiresIn: "1h" }
        
        const token = jwt.sign( connectionPayload, jwtSecret, expiration )

        return resp.status(200).json({
            userData: provideAnId(userFound),
            userToken: token,
            expiresIn: 3600
        });

    })
    .catch(() => {
        return resp.status(401).json({
            message: "auth failed"
        });
    })

}

exports.getAllUserController = (req, resp, next) => {  
    // the front will send us some data like serverUrl/api/user?currentPage=1?pageSize=20

    const currentPage = req.query.currentPage
    const pageSize = req.query.pageSize
    
    const allUsers = UserModel.find( 
        //find can take a callback function 
        // (error, docs) => {}
        // or a simple Js object 
        // { object which define a request }
        // if he is empty, he return all the documents of the concerned collection
    )

    if ( currentPage && pageSize ) {
        allUsers
        .skip(pageSize * (currentPage - 1)) // to skip the preview page element
        .limit(pageSize) // to limit the number of document sent
    }
    
    allUsers.then(
        (mongoDocuments) => {  
            resp.status(200).json(
                { data : provideAnId(mongoDocuments)}
            ) 

            console.log("all user list :");
            console.log( { data : provideAnId(mongoDocuments) } );
        }
    ).catch (
        (error) => {
            console.log(error);

            resp.status(200).json({
                data : []
            }) 
        }
    )
}

exports.getOneUserController = (req, resp, next) => { 
    // we can also use findById(req.params.id).then
    UserModel.findOne({ _id: req.params.id })
    .then(
        (mongoDocuments) => {  
            console.log("user found :");
            console.log( { data :  provideAnId(mongoDocuments) } );

            resp.status(200).json(
                { data :  provideAnId(mongoDocuments)}
            ) 
        }
    ).catch (
        (error) => {
            console.log("user not found error !");
            console.log(error);

            resp.status(404).json({ // always code 404 
                data : [],
                message: "user not found !"
            }) 
        }
    );
}

exports.updateUserController = (req, resp, next) => { 

    // the put request can contain the last image URL (in string) ou a new file
    const backendServerDirectoryAddress = req.protocol + "://" + req.get("host")
    let newProfileImagePath =  req.body.profileImagePath

    // if it is a new file
    if(newProfileImagePath) {
        newProfileImagePath = backendServerDirectoryAddress + "/images/" + req.file.filename;
    }

    const userUpdated =  new UserModel({ //creating new object from existing model
        _id : req.body.id,
        firstName : req.body.firstName,
        lastName :  req.body.lastName,
        email :  req.body.email,
        phoneNumber :  req.body.phoneNumber,
        country : req.body.county,
        city :  req.body.city,
        sex: req.body.sex,
        profileImagePath: newProfileImagePath,
        password: req.body.password
    });

    UserModel.updateOne({ _id: req.params.id }, userUpdated)
    .then(
        (mongoDocuments) => {  
            resp.status(200).json(
                { data : mongoDocuments}
            ) 

            console.log("user updated :");
            console.log( { data : mongoDocuments } );
        }
    ).catch (
        (error) => {
            console.log("updating user error !!!");
            console.log(error);

            resp.status(500).json({
                data : []
            }) 
        }
    );
}

exports.deleteUserController =  (req, resp, next) => {
    UserModel.deleteOne({ _id : req.params.id })
    .then((result) => { 
        console.log(result);
        resp.status(200).json({ message : "User deleted successfully"});
     })
    .catch((error) => { 
        console.log("deleting error");  
        console.log(error);
    })
}

