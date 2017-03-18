const express = require('express');
const router = express.Router();
const User = require('../db/schemas/users.js');
const addUser = require('../db/utils.js').addUser;

router.post('/users', (req, res) => {
  let addUserResult = addUser(req.body.username, req.body.password);
  if (addUserResult === null) {
    res.status(501).send('Failed to add to user database');
  } else {
    res.status(201).send('User added to database');
  }
});

module.exports = router;