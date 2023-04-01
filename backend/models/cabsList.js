const mongoose =  require("mongoose");
const { Schema } = mongoose;

const cabSchema = new Schema({
    cabId: {
        type: Number,
        required: true,
        unique: true
    },
    sourceLoc: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    cabStatus: {
        type: Boolean,
        required: true,
        default: false
    }
});

module.exports = cabSchema;