// src/models/User.js

import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true }, // Add username field
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true, },
});

// const User = mongoose.model('User', userSchema); if created alrady then 
const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;

