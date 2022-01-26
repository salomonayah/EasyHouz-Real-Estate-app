const express = require('express');

const announcementController = require('../controllers/announcement');
const announcementValidator = require('../validators/announcement-validator');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /announcement/getAll
router.get('/getAll', isAuth, announcementController.getAllAnnouncements);

// POST /announcement/addNew
router.post('/addNew', isAuth, announcementValidator, announcementController.addNewAnnouncement);

// GET /announcement/single/< announcementId >
router.get('/single/:announcementId', isAuth, announcementController.singleAnnouncement);

// PUT /announcement/edit/< announcementId >
router.put('/edit/:announcementId', isAuth, announcementValidator, announcementController.editAnnouncement);

// GET /announcement/edit/< announcementId >
router.delete('/remove/:announcementId', isAuth, announcementController.removeAnnouncement);


module.exports = router;
