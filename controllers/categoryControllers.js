const Category = require('../models/Category');
const fs = require('fs');

const createCategory = async (req, res) => {
  try {
    let category = await Category.create(req.body);

    res.status(201).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id);

    res.status(200).redirect('/users/dashboard');
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

module.exports = {
  createCategory,
  deleteCategory,
};
