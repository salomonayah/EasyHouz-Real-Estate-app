const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../constant/constant');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      const messages = errors.array().map((error) => {
        return error.msg;
      }).join(". ");

      const error = new Error('Validation failed. ' + messages );
      error.statusCode = 422;
      
      throw error;
    } catch (error) {
      next(error);
      // Stop setting header after error has been sent
      return;
    }
  }

  const fullname = req.body.fullname;
  const phonenumber = req.body.phonenumber;
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullname: fullname,
      phonenumber: phonenumber,
      email: email,
      password: hashedPassword,
    });

    const result = await user.save();

    const token = jwt.sign(
      {
        userId: result._id.toString(),
        fullname: fullname,
        phonenumber: phonenumber,
        email: email
      },
      constants.jwtSecret,
      { expiresIn: '24h' }
    );

    res.status(201).json({ 
      data: {
        userId: result._id.toString(),
        fullname: fullname,
        phonenumber: phonenumber,
        email: email,
        token: token
      },
      code: 201,
      message: 'Welcome ! You are now a member. Your account has been created!',
      error: null
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.login = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  let loadedUser;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      try {
        const error = new Error('email or password invalid. Please verify your credentials.');
        error.statusCode = 401;
        error.data = [];
        throw error;
      } catch (error) {
        next(error);
        // Stop setting header after error has been sent
        return;
      }
    }

    const isEqual = await bcrypt.compare(password, user.password);

    if (!isEqual) {
      try {
        const error = new Error('email or password invalid. Please verify your credentials.');
        error.statusCode = 401;
        error.data = [];
        throw error;
      } catch (error) {
        next(error);
        // Stop setting header after error has been sent
        return;
      }
    }

    loadedUser = user;

    const token = jwt.sign(
      {
        userId: loadedUser._id.toString(),
        fullname: loadedUser.fullname,
        phonenumber: loadedUser.phonenumber,
        email: loadedUser.email
      },
      constants.jwtSecret,
      { expiresIn: '24h' }
    );

    const loginMessage = 'Welcome back' + ` ${loadedUser.fullname}` + '!';

    res.status(200).json({ 
      data: {
        token: token, 
        userId: loadedUser._id.toString(),
        fullname: loadedUser.fullname,
        phonenumber: loadedUser.phonenumber,
        email: loadedUser.email
      },
      code: 201,
      message: loginMessage,
      error: null
    });

  } catch (err) {

    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);

  }
};
