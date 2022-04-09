const User = require('../models/User');
const Course = require('../models/Course');
const Category = require('../models/Category');

const fs = require('fs');

const createCourse = async (req, res) => {
  try {
    let uploadedDir = 'public/uploads';

    if (!fs.existsSync(uploadedDir)) {
      fs.mkdirSync(uploadedDir);
    }

    let uploadedImage = req.files.image;
    let uploadedPath = __dirname + '/../public/uploads/' + uploadedImage.name;

    uploadedImage.mv(uploadedPath, async () => {
      await Course.create({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        user: req.session.userID,
        image: '/uploads/' + uploadedImage.name,
      });
    });

    res.status(201).redirect('/courses');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    const courses = await Course.find(filter).sort('-createdAt');
    const categories = await Category.find();

    res.status(200).render('courses', {
      courses,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug }).populate('user');
    const categories = await Category.find();

    res.status(200).render('course', {
      course,
      categories,
      page_name: 'courses',
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const enrollCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.push({_id: req.body.course_id});
    await user.save();


    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourse,
  enrollCourse
};
