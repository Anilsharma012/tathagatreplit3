const express = require('express');
const router = express.Router();
const {
  createTestCategory,
  getAllTestCategories,
  updateTestCategory,
  deleteTestCategory,
  createCategorizedMockTest,
  getAllCategorizedMockTests,
  updateCategorizedMockTest,
  toggleTestPublication,
  deleteCategorizedMockTest
} = require('../controllers/AdminCategorizedMockTestController');
const { adminAuth } = require('../middleware/authMiddleware');

// Admin routes for test categories
router.post('/categories', adminAuth, createTestCategory);
router.get('/categories', adminAuth, getAllTestCategories);
router.put('/categories/:categoryId', adminAuth, updateTestCategory);
router.delete('/categories/:categoryId', adminAuth, deleteTestCategory);

// Admin routes for categorized mock tests
router.post('/tests', adminAuth, createCategorizedMockTest);
router.get('/tests', adminAuth, getAllCategorizedMockTests);
router.put('/tests/:testId', adminAuth, updateCategorizedMockTest);
router.put('/tests/:testId/publish', adminAuth, toggleTestPublication);
router.delete('/tests/:testId', adminAuth, deleteCategorizedMockTest);

module.exports = router;
