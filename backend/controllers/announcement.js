const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');

const Announcement = require('../models/announcement');
const User = require('../models/user');

exports.getAllAnnouncements = async (req, res, next) => {
  const currentPage = +req.query.page || 1;
  const perPage = +req.query.perPage;
  try {
    const totalItems = await Announcement.find().countDocuments();

    const dbannouncements = await Announcement.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    const announcements = dbannouncements.map(
      (announcement) => { 
        return { 
          houseId: announcement._id, 
          title: announcement.title,
          price: announcement.price,
          location: announcement.location,
          advantage: announcement.advantage,
          description: announcement.description,
          imageUrl: announcement.imageUrl,
          userId: announcement.userId,
          createdAt: announcement.createdAt,
          updatedAt: announcement.updatedAt
        }
      }
    );

    const totalPages = totalItems/perPage;

    res.status(200).json({
      data: {
        announcements:announcements,
        totalItems: totalItems,
        totalPages: totalPages,
        currentPage: currentPage
      },
      code: 200,
      message: 'Announcements fetched successfully.',
      error: null
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.addNewAnnouncement = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    try {
      const messages = errors.array().map((error) => {
        return error.msg;
      }).join(". ");

      const error = new Error('Validation failed. ' + messages);
      error.statusCode = 422;
      throw error;

    } catch (error) {
      next(error);
      // Stop setting header after error has been sent
      return;
    }
  }
  if (!req.file) {
    try {
      const error = new Error('No image provided. Please attach an image.');
      error.statusCode = 422;
      throw error;
    } catch (error) {
      next(error);
      // Stop setting header after error has been sent
      return;
    }
  }
  const title = req.body.title;
  const price = req.body.price;
  const location = req.body.location;
  const advantage = req.body.advantage;
  const description = req.body.description;
  const imageUrl = req.file.path;

  const announcement = new Announcement({
    title: title,
    price: price,
    location: location,
    advantage: advantage,
    description: description,
    imageUrl: imageUrl,
    userId: req.userId
  });

  try {
    await announcement.save();
    const user = await User.findById(req.userId);
    user.announcements.push(announcement);
    await user.save();

    res.status(201).json({ 
      data: {
        announcementId: announcement._id.toString(),
        title: title,
        price: price,
        location: location,
        advantage: advantage,
        description: description,
        imageUrl: imageUrl,
        userId:  user._id
      },
      code: 201,
      message: 'Your announcement has been created successfully!',
      error: null
    });

  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};



exports.singleAnnouncement = async (req, res, next) => {
  const announcementId = req.params.announcementId;

  const dbannouncement = await Announcement.findById(announcementId);

  try {
    if (!dbannouncement) {
      const error = new Error('Could not find announcement.');
      error.statusCode = 404;
      throw error;
    }
    
    const announcement = { 
      houseId: dbannouncement._id.toString(), 
      title: dbannouncement.title,
      price: dbannouncement.price,
      location: dbannouncement.location,
      advantage: dbannouncement.advantage,
      description: dbannouncement.description,
      imageUrl: dbannouncement.imageUrl,
      userId: dbannouncement.userId,
      createdAt: dbannouncement.createdAt,
      updatedAt: dbannouncement.updatedAt
    }

    res.status(201).json({ 
      data: announcement,
      code: 201,
      message: 'Announcement detail fetched!',
      error: null
    });

  } 
  catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.editAnnouncement = async (req, res, next) => {
  const announcementId = req.params.announcementId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {

    const messages = errors.array().map((error) => {
      return error.msg;
    }).join(". ");

    const error = new Error('Validation failed. ' + messages);
    error.statusCode = 422;
    throw error;
  }
  const title = req.body.title;
  const content = req.body.content;
  let imageUrl = req.body.image;
  if (req.file) {
    imageUrl = req.file.path;
  }
  if (!imageUrl) {
    const error = new Error('No file picked.');
    error.statusCode = 422;
    throw error;
  }
  try {
    const announcement = await Announcement.findById(announcementId);
    if (!announcement) {
      const error = new Error('Could not find announcement.');
      error.statusCode = 404;
      throw error;
    }
    if (announcement.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    if (imageUrl !== announcement.imageUrl) {
      clearImage(announcement.imageUrl);
    }
    announcement.title = title;
    announcement.imageUrl = imageUrl;
    announcement.content = content;
    const result = await announcement.save();
    res.status(200).json({ message: 'Announcement updated!', announcement: result });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.removeAnnouncement = async (req, res, next) => {
  const announcementId = req.params.announcementId;
  try {
    const announcement = await Announcement.findById(announcementId);

    if (!announcement) {
      const error = new Error('Could not find announcement.');
      error.statusCode = 404;
      throw error;
    }
    if (announcement.creator.toString() !== req.userId) {
      const error = new Error('Not authorized!');
      error.statusCode = 403;
      throw error;
    }
    // Check logged in user
    clearImage(announcement.imageUrl);
    await Announcement.findByIdAndRemove(announcementId);

    const user = await User.findById(req.userId);
    user.announcements.pull(announcementId);
    await user.save();

    res.status(200).json({ message: 'Deleted announcement.' });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

const clearImage = filePath => {
  filePath = path.join(__dirname, '..', filePath);
  fs.unlink(filePath, err => console.log(err));
};
