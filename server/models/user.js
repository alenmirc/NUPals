const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    department:  {
        type: String, // Update media type to String
        required: false,
        default: null
    },
    skills: [String],
    roles: [String],
    profilePicture:  {
        type: String, // Update media type to String
        required: false,
        default: null
    }
}, { timestamps: true });

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
