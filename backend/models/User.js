const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { 
        type: String, 
        unique: true, 
        required: true, 
        trim: true       
    },
    password: { 
        type: String, 
        required: true 
    },
    name: {
        type: String,
        required: true
    },
    phone_number: {
        type: String,
        required: false,
        match: [/^\d+$/, 'Please enter a valid phone number']
    },
    image: { type: String }, 
    status: { type: String, default: 'pending' } 
}, { versionKey: false });  

const User = mongoose.model('User', userSchema);

module.exports = User;
