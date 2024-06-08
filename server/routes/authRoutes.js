const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, logoutUser, getProfile, updateProfilepic} = require('../controllers/authController');
const { createUserPosting, getPost } = require('../controllers/userPostingController');
const bodyParser = require('body-parser');
const multer = require('multer');

// Apply CORS middleware to all routes
router.use(
  cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

router.use(bodyParser.json({ limit: '50mb' }));

// Define storage for multer
const storage = multer.memoryStorage();
const upload = multer({ 
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10 // 10 MB limit for field size
  }
});

// Define routes
router.get('/', test);
router.post('/register', registerUser); 
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', getProfile)
router.post('/updateprofilepic', upload.single('profilePicture'), updateProfilepic);




router.post('/createuserposting', upload.single('media'), createUserPosting);
router.get('/getpost', getPost);

module.exports = router;
