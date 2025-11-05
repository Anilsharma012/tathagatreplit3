const express = require('express');
const router = express.Router();
const {
  getTestCategories,
  getTestsByCategory,
  getTestDetails,
  getAvailableExams,
  getAvailableYears,
  getAvailableTopics
} = require('../controllers/CategorizedMockTestController');
const { optionalAuth } = require('../middleware/authMiddleware');

// Student routes for categorized mock tests
router.get('/categories', getTestCategories);
router.get('/tests', getTestsByCategory);
router.get('/test/:testId/details', optionalAuth, getTestDetails);
router.get('/exams', getAvailableExams);
router.get('/years', getAvailableYears);
router.get('/topics', getAvailableTopics);

module.exports = router;
