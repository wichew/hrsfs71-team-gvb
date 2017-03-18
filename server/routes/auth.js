const express = require('express');
const router = express.Router();
const User = require('../db/schemas/users.js');
const addUser = require('../db/utils.js').addUser;

router.post('/users', (req, res) => {
  console.log(req.body);
  let name = req.body.username;
  let password = req.body.password;
  let addUserResult = addUser(name, password);
  if (addUserResult) {
    res.status(201).send('User added to database');
  } else {
    res.status(501).send('Failed to add to user database');
  }
});

module.exports = router;