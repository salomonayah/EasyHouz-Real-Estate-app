const express = require("express"); // import express
const userRouter = express.Router(); // create a router

const checkAuthMiddleware = require('../middlewares/checkTokenMiddleware'); // check and verify token
const fileUploadMiddleware = require('../middlewares/fileUploadMiddleware'); // file upload

const userControllers = require("../controllers/userController")


// SETTING ROUTE====================================================
// Here is a POST request with file upload to create a new user
userRouter.post("/signUp", fileUploadMiddleware, userControllers.signUpController )

userRouter.post("/signIn", userControllers.signInController)

userRouter.get("/:id", checkAuthMiddleware, userControllers.getOneUserController)

userRouter.put("/:id", checkAuthMiddleware, fileUploadMiddleware, userControllers.updateUserController)

userRouter.delete("/:id", checkAuthMiddleware,userControllers.deleteUserController )


module.exports = userRouter;