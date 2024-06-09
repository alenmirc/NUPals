const User = require('../models/user');
const { hashPassword, comparePassword} = require('../helpers/auth')
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

// REGISTER ENDPOINT DITO
const registerUser = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        // check if name was entered
        if (!firstName) {
            return res.json({
                error: 'First Name is required'
            });
        }
        if (!lastName) {
            return res.json({
                error: 'Last Name is required'
            });
        }
        // check if password is good
        if (!password || password.length < 6) {
            return res.json({
                error: 'Password is required and should be 6 characters long'
            });
        }
        // check email
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({
                error: 'Email is already taken'
            });
        }

        const hashedPassword = await hashPassword(password)

        //create sa database
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            roles: ['user']
        });
        return res.json(user)
    } catch (error) {
        console.log(error)
    }
};

// LOGIN ENDPOINT DITO
const loginUser = async(req, res) => {
    try {
       const {email, password} = req.body;
   
        //CHECK IF USER EXIST
       const user = await User.findOne({email});
       if(!user) {
           return res.json({
               error: 'No user Found'
           })
       }
       
       //CHECK IF PASSWORD MATCH
       const match = await comparePassword(password, user.password)
       if(match) {
           jwt.sign({email: user.email, id: user._id, firstName: user.firstName, lastName: user.lastName}, process.env.JWT_SECRET, {}, (err, token) => {
               if(err) throw err;
               res.cookie('token', token).json(user)
           })
       }
       if(!match) {
           res.json({
               error: 'Password do not match'
           })
       }
    } catch (error) {
       console.log(error)
    }
   }


//LOGOUT DITO
const logoutUser = (req, res) => {
    res.cookie('token', '', { maxAge: 1 }).json('Logged out');
};

//GET PROFILE

const getProfile = (req, res) => {
    const {token} = req.cookies
    if(token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}


// Update profile function
const updateProfile = async (req, res) => {
    const { userId, firstName, lastName, department, skills, profilePicture } = req.body;
  
    try {
      const user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Update user details
      user.firstName = firstName || user.firstName;
      user.lastName = lastName || user.lastName;
      user.department = department || user.department;
      user.skills = skills ? JSON.parse(skills) : user.skills;
  
      // Update profile picture if provided
      if (profilePicture) {
        user.profilePicture = profilePicture || user.profilePicture;
        
      }
  
      await user.save();
  
      res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile', error });
    }
  };

//get userprofile
const getUserprofile = async (req, res) => {
    try {
      const { userId } = req.query; // Get userId from query parameters
      if (!userId) {
        return res.status(400).json({ message: 'User ID is required' });
      }
      const user = await User.findById(userId).select('firstName lastName email department skills profilePicture'); // Find user by ID
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error retrieving user profile' });
    }
  };
  

    

module.exports = {
    test,
    registerUser,
    loginUser,
    logoutUser,
    getProfile,
    updateProfile,
    getUserprofile
};
