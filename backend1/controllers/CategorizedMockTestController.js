const CategorizedMockTest = require('../models/CategorizedMockTest');
const TestCategory = require('../models/TestCategory');
const MockTestQuestion = require('../models/MockTestQuestion');

// Get all test categories for navigation
const getTestCategories = async (req, res) => {
  try {
    const { type, mainCategory, parentId } = req.query;
    
    const filter = { isActive: true };
    if (type) filter.type = type;
    if (mainCategory) filter.mainCategory = mainCategory;
    if (parentId) filter.parentCategory = parentId;
    
    const categories = await TestCategory.find(filter).sort({ displayOrder: 1, name: 1 });
    
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

// Get tests by category filters
const getTestsByCategory = async (req, res) => {
  try {
    const { testType, examType, selectionMode, mainTopic, subTopic, year } = req.query;
    
    const filter = { isActive: true, isPublished: true };
    
    if (testType) filter.testType = testType;
    if (examType) filter.examType = examType;
    if (selectionMode) filter.selectionMode = selectionMode;
    if (mainTopic) filter.mainTopic = mainTopic;
    if (subTopic) filter.subTopic = subTopic;
    if (year) filter.year = parseInt(year);
    
    const tests = await CategorizedMockTest.find(filter)
      .select('-questions -attempts')
      .sort({ year: -1, createdAt: -1 });
    
    res.status(200).json({
      success: true,
      tests,
      count: tests.length
    });
  } catch (error) {
    console.error('Error fetching tests:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch tests',
      error: error.message
    });
  }
};

// Get test details with declaration
const getTestDetails = async (req, res) => {
  try {
    const { testId } = req.params;
    
    const test = await CategorizedMockTest.findById(testId)
      .select('-questions')
      .populate('categories', 'name type');
    
    if (!test) {
      return res.status(404).json({
        success: false,
        message: 'Test not found'
      });
    }
    
    if (!test.isPublished || !test.isActive) {
      return res.status(403).json({
        success: false,
        message: 'Test is not available'
      });
    }
    
    res.status(200).json({
      success: true,
      test
    });
  } catch (error) {
    console.error('Error fetching test details:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch test details',
      error: error.message
    });
  }
};

// Get available exam types
const getAvailableExams = async (req, res) => {
  try {
    const { testType } = req.query;
    
    const filter = { isActive: true, isPublished: true };
    if (testType) filter.testType = testType;
    
    const exams = await CategorizedMockTest.distinct('examType', filter);
    
    res.status(200).json({
      success: true,
      exams: exams.filter(exam => exam != null)
    });
  } catch (error) {
    console.error('Error fetching available exams:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available exams',
      error: error.message
    });
  }
};

// Get available years for previous year papers
const getAvailableYears = async (req, res) => {
  try {
    const { examType } = req.query;
    
    const filter = { 
      testType: 'Previous Year Papers',
      isActive: true, 
      isPublished: true 
    };
    if (examType) filter.examType = examType;
    
    const years = await CategorizedMockTest.distinct('year', filter);
    
    res.status(200).json({
      success: true,
      years: years.sort((a, b) => b - a)
    });
  } catch (error) {
    console.error('Error fetching available years:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available years',
      error: error.message
    });
  }
};

// Get available topics and subtopics
const getAvailableTopics = async (req, res) => {
  try {
    const { mainTopic } = req.query;
    
    const filter = { 
      selectionMode: 'Topic Wise',
      isActive: true, 
      isPublished: true 
    };
    
    if (mainTopic) {
      filter.mainTopic = mainTopic;
      const subTopics = await CategorizedMockTest.distinct('subTopic', filter);
      return res.status(200).json({
        success: true,
        subTopics: subTopics.filter(topic => topic != null)
      });
    }
    
    const topics = await CategorizedMockTest.distinct('mainTopic', filter);
    
    res.status(200).json({
      success: true,
      topics: topics.filter(topic => topic != null)
    });
  } catch (error) {
    console.error('Error fetching available topics:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch available topics',
      error: error.message
    });
  }
};

module.exports = {
  getTestCategories,
  getTestsByCategory,
  getTestDetails,
  getAvailableExams,
  getAvailableYears,
  getAvailableTopics
};
