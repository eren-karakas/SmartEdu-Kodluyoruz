const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');


const createUser = async (req, res) => {
  try {
    let user = await User.create(req.body);

    res.status(201).redirect('/login');

  } catch (error) {
    const errors = validationResult(req);

    for(let i=0; i < errors.array().length; i++){
      req.flash('error', `${errors.array()[i].msg}`);
    }

    res.status(400).redirect('/register');
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
          } else {
            req.flash('error', 'Your Password is not Correct!');
            res.status(400).redirect('/login');
          }
        });
      } else {
        req.flash('error', 'User is not Exists!');
        res.status(400).redirect('/login');
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
  const user = await User.findOne({_id : req.session.userID }).populate('courses');
  const courses = await Course.find({user: req.session.userID});
  const categories = await Category.find();
  res.status(200).render('dashboard', {
    page_name: 'dashboard',
    user,
    courses,
    categories
  });
};


module.exports = {
  createUser,
  loginUser,
  logoutUser,
  getDashboardPage
};
