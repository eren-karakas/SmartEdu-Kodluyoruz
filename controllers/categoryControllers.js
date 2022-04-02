const Category = require('../models/Category');
const fs = require('fs');

const createCategory = async (req, res) => {
  try {
    let category = await Category.create(req.body);

    res.status(201).json({
      status: 'success',
      category,
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      error,
    });
  }
};

module.exports = {
  createCategory,
};
