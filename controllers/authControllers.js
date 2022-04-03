const User = require('../models/User');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
  try {
    let user = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      user,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    await User.findOne({ email }, (err, user) => {
      if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
          if (same) {
            req.session.userID = user._id;
            res.status(200).redirect('/users/dashboard');
          }
        });
      }
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const logoutUser = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/')
  })
};

const getDashboardPage = async (req, res) => {
  const user = await User.findOne({_id : req.session.userID });
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
  });
};


module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage
};
