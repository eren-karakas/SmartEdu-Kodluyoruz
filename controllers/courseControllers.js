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

    req.flash('success', `${req.body.name} has been created succesfully`);
    res.status(201).redirect('/courses');
  } catch (error) {
    req.flash('error', `Something happened!`);
    res.status(400).redirect('/courses');
  }
};

const getAllCourses = async (req, res) => {
  try {
    const categorySlug = req.query.categories;
    const query = req.query.search;
    const category = await Category.findOne({ slug: categorySlug });

    let filter = {};

    if (categorySlug) {
      filter = { category: category._id };
    }

    if (query) {
      filter = { name: query };
    }

    if (!query && !categorySlug) {
      filter.name = '';
      filter.category = null;
    }

    const courses = await Course.find({
      $or: [
        { name: { $regex: '.*' + filter.name + '.*', $options: 'i' } },
        { category: filter.category },
      ],
    })
      .sort('-createdAt')
      .populate('user');

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
    const user = await User.findById(req.session.userID);
    const course = await Course.findOne({ slug: req.params.slug })
      .populate('user')
      .populate('category');
    console.log(course);
    const categories = await Category.find();

    res.status(200).render('course', {
      course,
      categories,
      user,
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
    await user.courses.push({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const releaseCourse = async (req, res) => {
  try {
    const user = await User.findById(req.session.userID);
    await user.courses.pull({ _id: req.body.course_id });
    await user.save();

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    let deletedImage = __dirname + '/../public' + course.image;
    console.log(deletedImage);

    if ((await Course.find({ image: course.image })).length < 2) {
      fs.unlinkSync(deletedImage);
    }

    await Course.findOneAndRemove({ slug: req.params.slug });

    req.flash('success', `${course.name} has been removed succesfully`);

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const updateCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug });
    course.name = req.body.name;
    course.description = req.body.description;
    course.category = req.body.category;
    course.save();

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
  enrollCourse,
  releaseCourse,
  deleteCourse,
  updateCourse,
};
