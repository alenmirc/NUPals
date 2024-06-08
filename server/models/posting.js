const mongoose = require('mongoose');
const { Schema } = mongoose;

const userPostingSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    content: {
      type: String
    },
    media: {
      type: String, // Update media type to String
      required: false
    }
  }, { timestamps: true });

const UserPostingModel = mongoose.model('Posts', userPostingSchema);

module.exports = UserPostingModel;
