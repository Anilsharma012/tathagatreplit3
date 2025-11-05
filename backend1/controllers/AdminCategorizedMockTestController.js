const CategorizedMockTest = require('../models/CategorizedMockTest');
const TestCategory = require('../models/TestCategory');

// Create test category
const createTestCategory = async (req, res) => {
  try {
    const { name, type, mainCategory, parentCategory, displayOrder, description } = req.body;
    const adminId = req.user.id;
    
    const category = new TestCategory({
      name,
      type,
      mainCategory,
      parentCategory,
      displayOrder: displayOrder || 0,
      description,
      createdBy: adminId
    });
    
    await category.save();
    
    res.status(201).json({
      success: true,
      message: 'Test category created successfully',
      category
    });
  } catch (error) {
    console.error('Error creating test category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create test category',
      error: error.message
    });
  }
};

// Get all test categories (admin)
const getAllTestCategories = async (req, res) => {
  try {
    const { type, mainCategory } = req.query;
    
    const filter = {};
    if (type) filter.type = type;
    if (mainCategory) filter.mainCategory = mainCategory;
    
    const categories = await TestCategory.find(filter)
      .populate('parentCategory', 'name')
      .sort({ displayOrder: 1, name: 1 });
    
    res.status(200).json({
      success: true,
      categories
    });
  } catch (error) {
    console.error('Error fetching test categories:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test categories',
      error: error.message
    });
  }
};

// Update test category
const updateTestCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const updates = req.body;
    
    const category = await TestCategory.findByIdAndUpdate(
      categoryId,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Test category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Test category updated successfully',
      category
    });
  } catch (error) {
    console.error('Error updating test category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update test category',
      error: error.message
    });
  }
};

// Delete test category
const deleteTestCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const category = await TestCategory.findByIdAndDelete(categoryId);
    
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Test category not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Test category deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting test category:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete test category',
      error: error.message
    });
  }
};

// Create categorized mock test
const createCategorizedMockTest = async (req, res) => {
  try {
    const testData = req.body;
    const adminId = req.user.id;
    
    const test = new CategorizedMockTest({
      ...testData,
      createdBy: adminId
    });
    
    await test.save();
    
    res.status(201).json({
      success: true,
      message: 'Categorized mock test created successfully',
      test
    });
  } catch (error) {
    console.error('Error creating categorized mock test:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create categorized mock test',
      error: error.message
    });
  }
};

// Get all categorized mock tests (admin)
const getAllCategorizedMockTests = async (req, res) => {
  try {
    const { testType, examType, page = 1, limit = 20 } = req.query;
    
    const filter = {};
    if (testType) filter.testType = testType;
    if (examType) filter.examType = examType;
    
    const tests = await CategorizedMockTest.find(filter)
      .select('-questions')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await CategorizedMockTest.countDocuments(filter);
    
    res.status(200).json({
      success: true,
      tests,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching categorized mock tests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch categorized mock tests',
      error: error.message
    });
  }
};

// Update categorized mock test
const updateCategorizedMockTest = async (req, res) => {
  try {
    const { testId } = req.params;
    const updates = req.body;
    
    const test = await CategorizedMockTest.findByIdAndUpdate(
      testId,
      updates,
      { new: true, runValidators: true }
    );
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Test updated successfully',
      test
    });
  } catch (error) {
    console.error('Error updating categorized mock test:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update test',
      error: error.message
    });
  }
};

// Publish/unpublish test
const toggleTestPublication = async (req, res) => {
  try {
    const { testId } = req.params;
    
    const test = await CategorizedMockTest.findById(testId);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    test.isPublished = !test.isPublished;
    test.publishedAt = test.isPublished ? new Date() : null;
    await test.save();
    
    res.status(200).json({
      success: true,
      message: `Test ${test.isPublished ? 'published' : 'unpublished'} successfully`,
      test
    });
  } catch (error) {
    console.error('Error toggling test publication:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update test publication status',
      error: error.message
    });
  }
};

// Delete test
const deleteCategorizedMockTest = async (req, res) => {
  try {
    const { testId } = req.params;
    
    const test = await CategorizedMockTest.findByIdAndDelete(testId);
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Test deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting test:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete test',
      error: error.message
    });
  }
};

module.exports = {
  createTestCategory,
  getAllTestCategories,
  updateTestCategory,
  deleteTestCategory,
  createCategorizedMockTest,
  getAllCategorizedMockTests,
  updateCategorizedMockTest,
  toggleTestPublication,
  deleteCategorizedMockTest
};
