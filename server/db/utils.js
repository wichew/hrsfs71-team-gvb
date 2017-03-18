const User = require('./schemas/users.js');

// Returns null is user already exists.
// Returns newUser, if user is successfully added to database.
module.exports.addUser = (username, password, cb) => {
  console.log('adduser called cb ', cb);
  User.find({name: username}, (err, user) => {
    if (err) {
      throw err;
    } else if (user.length) {
      console.log('user already in database');
      console.log('cb', cb);
      cb(null);
    } else {
      console.log('user being created');
      User.create({name: username, password: password}, (err, newUser) => {
        if (err) {
          throw err;
        } else {
          console.log('user successfully added:', newUser);
          cb(newUser);
        }
      });
    }
  });
};

// Returns null if user does not exist.
module.exports.findUser = (username, cb) => {
  User.findOne({name: username}, (err, user) => {
    if (err) {
      throw err;
    } else if (!user) {
      console.log('user does not exist');
      return cb(null);
    } else {
      cb(user);
    }
  });
};


// TODO: These seeding functions are not yet working
User.remove({});

var seedUsers = [
  { name: 'a',
    password: 'a'
  },
  { name: 'b',
    password: 'b'
  },
  { name: 'c',
    password: 'c'
  },
];

seedUsers.forEach((user) => {
  module.exports.addUser(user.name, user.password);
});