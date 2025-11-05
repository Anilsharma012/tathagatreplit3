const mongoose = require('mongoose');

const testCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true
  },
  type: {
    type: String,
    enum: ['Main', 'Exam', 'Topic', 'SubTopic'],
    required: true
  },
  mainCategory: {
    type: String,
    enum: ['Previous Year Papers', 'Full-Length Tests', 'Sessional Tests', 'Module Tests'],
    required: function() {
      return this.type !== 'Main';
    }
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestCategory',
    default: null
  },
  displayOrder: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  }
}, {
  timestamps: true
});

testCategorySchema.index({ type: 1, mainCategory: 1, isActive: 1 });
testCategorySchema.index({ parentCategory: 1 });
testCategorySchema.index({ displayOrder: 1 });

module.exports = mongoose.model('TestCategory', testCategorySchema);
