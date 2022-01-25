const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true // add unique
  },
  email: {
    type: String,
    required: true // add unique
  },
  password: {
    type: String,
    required: true
  },
  announcements: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Announcement'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);