const User = require('./schemas/users.js');

// Returns null is user already exists.
// Returns newUser, if user is successfully added to database.
module.exports.addUser = (username, password) => {
  User.find({name: username}, (err, user) => {
    if (err) {
      throw err;
    } else if (user.length) {
      console.log('user already exists');
      return null;
    } else {
      User.create({name: username, password: password}, (err, newUser) => {
        if (err) {
          throw err;
        } else {
          return newUser;
        }
      });
    }
  });
};

// Returns null if user does not exist.
module.exports.findUser = (username, password) => {
  User.findOne({name: username}, (err, user) => {
    if (err) {
      throw err;
    } else if (!user) {
      console.log('user does not exist');
    }
    return user;
  });
};

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

seedUsers.forEach((user, i) => {
  console.log('result of add:', module.exports.addUser(user.name, user.password));
});