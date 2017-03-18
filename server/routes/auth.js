const express = require('express');
const router = express.Router();
const User = require('../db/schemas/users.js');
const dbUtils = require('../db/utils.js');

router.post('/users', (req, res) => {
  dbUtils.addUser(req.body.username, req.body.password, (user) => {
    if (!user) {
      res.status(501).send('Failed to add to user database');
    } else {
      res.status(201).send('User added to database');
    }
  });
});

router.get('/users/:username', (req, res) => {
  dbUtils.findUser(req.params.username, (user) => {
    if (!user) {
      res.status(404).send('User does not exist');
    } else {
      res.status(200).send(user);
    }
  });
});

router.post('/login', (req, res) => {
  res.send('You sent a post to /db/login!');
});


module.exports = router;