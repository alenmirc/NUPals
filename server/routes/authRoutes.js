const express = require('express');
const router = express.Router();
const cors = require('cors');
const { test, registerUser, loginUser, logoutUser, getProfile, createPost, getAllPosts, getPostById} = require('../controllers/authController');

// Apply CORS middleware to all routes
router.use(
  cors({
  credentials: true,
  origin: 'http://localhost:5173'
}));

// Define routes
router.get('/', test);
router.post('/register', registerUser); 
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.get('/profile', getProfile)
router.post('/createpost', createPost)
router.get('/getallpost', getAllPosts)
router.get('/getpostbyid', getPostById)

module.exports = router;
