const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express');
const app = express();
const port = 8080;
const db = require('./db');

app.use(cors())
app.use(bodyParser.json())

app.post('/login', async (req, res) => {
  const userAuth = await db.authenticateUser(req.body.user);
  if(!userAuth) {
    res.json({ rejected: true })
  }
  res.json(userAuth);
})

app.post('/wishlists/:id', async (req, res) => {
  console.log(req.body.action)
  if (req.body.action === 'Bought') {
    console.log('Bought')
    const result = await db.addGifter(req.params.id, req.body);
    res.json(result)
  } else if (req.body.action === 'Interested gifter') {
    const result = await db.addInterestedGifter(req.params.id, req.body);
    res.json(result)
  } else if (req.body.action === 'Add new Item') {
    console.log('New item being added')
    const result = await db.addlistitem(req.params.id, req.body.newItem);
    console.log(result)
    res.json(result)
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.end()
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

module.exports = app;
