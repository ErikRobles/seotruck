const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const cvSchema = mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/-/g, ''),
    },
    firstName: {
      type: String,
      required: [true, 'Please Add a First Name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please Add a Last Name'],
    },
    email: {
      type: String,
      required: [true, 'Please Add an Email'],
    },
    phone: {
      type: String,
      required: [true, 'Please Add a Phone Number'],
    },
    cvfile: {
      data: Buffer,
      contentType: String,
    },
    fileUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zip: {
      type: String,
    },
    usEligible: {
      type: String,
    },
    dob: {
      type: String,
    },
    description: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CV', cvSchema);
