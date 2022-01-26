const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true,
    unique : true, 
    dropDups: true
  },
  email: {
    type: String,
    required: true,
    unique : true, 
    dropDups: true
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