const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
  app.post('/api/create_post', async (req, res) => {
    console.log('request', req.body);
    // Check if user has that day's object already created
    const user = await User.findOne({
      _id: req.body.id,
      'dates.date': req.body.date,
    });
    console.log('user has day', user);
    // If it doesnt create day object
    if (user === null) {
      User.updateOne(
        { _id: req.body.id },
        { $addToSet: { dates: { date: req.body.date, posts: [] } } },
        function (err) {
          if (err) return res.send('create day error -->', error);
        }
      );
      console.log('created day');
    }
    // Add post to day
    User.updateOne(
      { _id: req.body.id, 'dates.date': req.body.date },
      {
        $push: {
          'dates.$.posts': {
            category: req.body.post.category,
            product: req.body.post.product,
            quantity: req.body.post.quantity,
            kcal: req.body.post.kcal,
          },
        },
      },
      function (err) {
        if (err) return res.send('Adding post error -->', error);
      }
    );
    console.log('added post');
    return res.send('Added successfully');
  });

  app.post('/api/fetch_posts', async (req, res) => {
    const posts = await User.findOne(
      { _id: req.user._id, 'dates.date': req.body.date },
      { 'dates.$.posts': 1 }
    );
    res.send(posts);
  });
};
