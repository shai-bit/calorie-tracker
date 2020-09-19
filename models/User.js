const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  email: String,
  password: String,
  dates: [
    {
      date: String,
      posts: [
        { category: String, product: String, quantity: Number, kcal: Number },
      ],
    },
  ],
});

mongoose.model('users', userSchema);
