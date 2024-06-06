const mongoose = require('mongoose');
const { Schema } = mongoose;

    const userPostingSchema = new Schema({
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        content: {
            type: String,
            required: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        comments: [{
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }]
    }, { timestamps: true });

    const UserPostingModel = mongoose.model('Posts', userPostingSchema);

module.exports = UserPostingModel;