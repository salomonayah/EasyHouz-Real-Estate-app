const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const constants = require('../constant/constant');
const User = require('../models/user');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }

  const fullName = req.body.fullName;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName: fullName,
      phoneNumber: phoneNumber,
      email: email,
      password: hashedPassword,
    });

    const result = await user.save();
    res.status(201).json({ 
      data: {
        userId: result._id
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
      const error = new Error('email or password invalid. Please verify your credentials.');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('email or password invalid. Please verify your credentials.');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        userId: loadedUser._id.toString(),
        fullName: loadedUser.fullName,
        phoneNumber: loadedUser.phoneNumber,
        email: loadedUser.email
      },
      constants.jwtSecret,
      { expiresIn: '24h' }
    );

    const loginMessage = 'Welcome back' + ` ${loadedUser.fullName}` + '!';

    res.status(200).json({ 
      data: {
        token: token, 
        userId: loadedUser._id.toString()
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
