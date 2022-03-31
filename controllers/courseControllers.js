const Course = require('../models/Course');
const fs = require('fs');

const createCourse = async (req, res) => {
    
    try {

    /* let uploadedDir = 'public/uploads';

    if(!fs.existsSync(uploadedDir)){
        fs.mkdir(uploadedDir)
    }

    let uploadedImage = req.files.body
    let uploadedPath = __dirname + '/../public' + uploadedImage.name

    uploadedImage.mv(uploadedPath, async () => {
        await Course.create({
            ...req.body,
            image : '/uploads' + uploadedImage.name
        })
    }); */

    let course = await Course.create(req.body)

    res.status(201).json({
      status: 'success',
      course,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const getAllCourses = async (req, res) => {

    try {
    const courses = await Course.find();

    res.status(200).render('courses', {
        courses,
        page_name : 'courses'
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
  const course = await Course.findOne( {slug : req.params.slug} );

  res.status(200).render('course', {
      course,
      page_name : 'courses'
  });
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
};
