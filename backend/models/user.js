const mongoose  = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email : {
        type: String,
        unique: true,
        required: true,
    },
    source : {
        type: String,
        required : true
    },
    destination: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;