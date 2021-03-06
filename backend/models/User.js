const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        fullName: {
            type: String
        },
        mobile: {
            type: Number
        },
        gender: {
            type: String
        }
    },
    {
        versionKey: false
    }
);

module.exports = mongoose.model('User', userSchema);
