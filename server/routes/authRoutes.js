const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, logoutUser, getProfile, updateProfile, getUserprofile} = require('../controllers/authController');
const { createUserPosting, getPost, getPostbyid, deletePost } = require('../controllers/userPostingController');
const { getUsers, getAllpost, loginAdmin, logoutAdmin, adminDeletepost, updateUser, createUser, deleteUser } = require('../controllers/adminController');
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

//usercontroller
router.get('/', test);
router.post('/register', registerUser); 
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', getProfile)
router.put('/updateprofile', upload.single('profilePicture'), updateProfile);
router.get('/getUserprofile', getUserprofile);


//posting controller
router.post('/createuserposting', upload.single('media'), createUserPosting);
router.get('/getpost', getPost);
router.get('/getpostbyid', getPostbyid);
router.delete('/deletepost/:postId', deletePost);

//admin controller
router.get('/getusers', getUsers);
router.get('/getallpost', getAllpost);
router.post('/loginadmin', loginAdmin);
router.post('/logout', logoutAdmin)
router.delete('/admindeletepost/:postId', adminDeletepost);
router.put('/updateuser/:id', updateUser);
router.delete('/deleteuser/:id', deleteUser);
router.post('/createuser', createUser);

module.exports = router;
