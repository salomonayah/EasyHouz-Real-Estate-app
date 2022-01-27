const express = require('express');

const announcementController = require('../controllers/announcement');
const announcementValidator = require('../validators/announcement-validator');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// GET /api/announcement/getAll?page=< pageNumber >
router.get('/getAll', isAuth, announcementController.getAllAnnouncements);

// POST /api/announcement/addNew
router.post('/addNew', isAuth, announcementValidator, announcementController.addNewAnnouncement);

// GET /api/announcement/single/< announcementId >
router.get('/single/:announcementId', isAuth, announcementController.singleAnnouncement);

// PUT /api/announcement/edit/< announcementId >
router.put('/edit/:announcementId', isAuth, announcementValidator, announcementController.editAnnouncement);

// GET /api/announcement/edit/< announcementId >
router.delete('/remove/:announcementId', isAuth, announcementController.removeAnnouncement);


module.exports = router;
