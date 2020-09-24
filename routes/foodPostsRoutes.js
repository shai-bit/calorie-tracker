const mongoose = require('mongoose');

const User = mongoose.model('users');

module.exports = (app) => {
  // Post creation
  app.post('/api/create_post', async (req, res) => {
    console.log('request', req.body);
    // Check if user has that day's object already created
    const user = await User.findOne({
      _id: req.user._id,
      'dates.date': req.body.date,
    });
    console.log('user has day', user);
    // If it doesnt create day object
    if (user === null) {
      User.updateOne(
        { _id: req.user._id },
        { $addToSet: { dates: { date: req.body.date, posts: [] } } },
        function (err) {
          if (err) return res.send('create day error -->', error);
        }
      );
      console.log('created day');
    }
    // Add post to day
    User.updateOne(
      { _id: req.user._id, 'dates.date': req.body.date },
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

  // Post fetching
  app.post('/api/fetch_posts', async (req, res) => {
    console.log('date:', req.body);
    const posts = await User.findOne(
      { _id: req.user._id, 'dates.date': req.body.date },
      { 'dates.$.posts': 1 }
    );
    res.send(posts);
  });

  // Post updating
  app.post('/api/update_post', async (req, res) => {
    const { category, product, kcal, quantity, itemId } = req.body.updatedItem;
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: {
          'dates.$[outer].posts.$[inner]': {
            category,
            product,
            kcal,
            quantity,
          },
        },
      },
      {
        arrayFilters: [
          { 'outer.date': req.body.date },
          { 'inner._id': itemId },
        ],
      },
      function (err) {
        if (err) return res.send('Update post error -->', error);
      }
    );
    return res.send('Updated successfully');
  });

  //Post deletion
  app.post('/api/delete_post', async (req, res) => {
    await User.updateOne(
      { _id: req.user._id },
      {
        $pull: {
          'dates.$[outer].posts': { _id: req.body.itemId },
        },
      },
      {
        arrayFilters: [{ 'outer.date': req.body.date }],
      },
      function (err) {
        if (err) return res.send('Delete post error -->', error);
      }
    );
    return res.send('Deleted successfully');
  });

  // Update goal
  app.post('/api/update_goal', async (req, res) => {
    await User.updateOne(
      { _id: req.user._id },
      {
        $set: { goal: req.body.goal },
      },
      function (err) {
        if (err) return res.send('Update goal error -->', error);
      }
    );
    return res.send('Updated successfully');
  });
};
