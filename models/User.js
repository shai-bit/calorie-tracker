const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  password: String,
});

mongoose.model('users', userSchema);
