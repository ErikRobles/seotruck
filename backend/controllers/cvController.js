const asyncHandler = require('express-async-handler');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const path = require('path');
const { File, Web3Storage } = require('web3.storage');

const CV = require('../models/cvModel');

const w3storage = new Web3Storage({ token: process.env.WEB3_STORAGE_TOKEN });

function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /doc|docx|pdf|odf/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Documents Only!');
  }
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, process.env.UPLOAD_PATH);
  },
  filename: (req, file, cb) => {
    cb(null, uuidv4() + '-' + file.originalname);
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb);
  },
});

const maxSize = 4 * 1000 * 1000;

const upload = multer({ storage: storage, limits: { fileSize: maxSize } });

// @desc Get all cvs
// @route GET /api/cvs
// @access Public
const getCVs = asyncHandler(async (req, res) => {
  const cvs = await CV.find();
  return res.status(200).json(cvs);
});

// @desc Create a new cv
// @route POST /api/cvs/create
// @access Public
const createCV = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    cvfile,
    address,
    city,
    state,
    zip,
    usEligible,
    dob,
    description,
  } = req.body;
  const fileUrl = req.file.filename;
  console.log(fileUrl);
  const bytes = fs.readFileSync(`${process.env.UPLOAD_PATH}/${fileUrl}`);
  const newFile = new File([bytes], fileUrl);
  const cid = await w3storage.put([newFile]);
  const fileName = path.basename(fileUrl);
  const filePath = path.join(process.env.UPLOAD_PATH, fileName);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  const cv = CV.create({
    firstName,
    lastName,
    email,
    phone,
    cvfile,
    address,
    city,
    state,
    zip,
    usEligible,
    dob,
    description,
    fileUrl: `https://${cid}.ipfs.dweb.link/${fileName}`,
  });

  res.status(201).json(cv);
};

// @desc Get single cv
// @route GET /api/cvs/:id
// @access Public
const getCV = asyncHandler(async (req, res) => {
  const cv = await CV.findById(req.params.id);
  if (!cv) {
    res.status(404);
    throw new Error('CV not found');
  }
  res.status(200).json(cv);
});

// @desc Delete single cv
// @route DELETE /api/cvs/:id
// @access Public
const deleteCV = asyncHandler(async (req, res) => {
  const cv = await CV.findById(req.params.id);
  if (!cv) {
    res.status(404);
    throw new Error('CV not found');
  }

  await cv.remove();

  res.status(200).json({ success: true });
});

module.exports = {
  createCV,
  upload,
  getCVs,
  getCV,
  deleteCV,
};
