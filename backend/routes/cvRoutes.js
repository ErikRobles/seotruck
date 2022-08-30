const express = require('express');
const router = express.Router();

const {
  createCV,
  upload,
  getCVs,
  getCV,
  deleteCV,
} = require('../controllers/cvController');

router.route('/').get(getCVs).post(upload.single('cvfile'), createCV);
router.route('/:id').get(getCV).delete(deleteCV);

module.exports = router;
