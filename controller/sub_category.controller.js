const Subcategory = require('../models/sub_category');

// Controller functions to handle subcategory related operations

// Get all subcategories
const getAllSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find();
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving subcategories' });
  }
};

// Create a new subcategory
const createSubcategory = async (req, res) => {
  const { name } = req.body.data;
  try {
    const subcategory = await Subcategory.create({ name });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error creating subcategory' });
  }
};

// Get a single subcategory by ID
const getSubcategoryById = async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    const subcategory = await Subcategory.findById(subcategoryId);
    if (!subcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving subcategory' });
  }
};

// Update a subcategory by ID
const updateSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  const { name } = req.body;
  try {
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { name},
      { new: true }
    );
    if (!updatedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.json(updatedSubcategory);
  } catch (error) {
    res.status(500).json({ message: 'Error updating subcategory' });
  }
};

// Delete a subcategory by ID
const deleteSubcategory = async (req, res) => {
  const { subcategoryId } = req.params;
  try {
    const deletedSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);
    if (!deletedSubcategory) {
      return res.status(404).json({ message: 'Subcategory not found' });
    }
    res.json({ message: 'Subcategory deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting subcategory' });
  }
};

module.exports = {
  getAllSubcategories,
  createSubcategory,
  getSubcategoryById,
  updateSubcategory,
  deleteSubcategory,
};