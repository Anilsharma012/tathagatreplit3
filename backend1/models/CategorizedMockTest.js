const mongoose = require('mongoose');

const categorizedMockTestSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Mock test title is required'],
    trim: true,
    maxlength: [150, 'Title cannot exceed 150 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  testType: {
    type: String,
    enum: ['Previous Year Papers', 'Full-Length Tests', 'Sessional Tests', 'Module Tests'],
    required: true
  },
  examType: {
    type: String,
    enum: ['CAT', 'XAT', 'SNAP', 'XSAT', 'NMAT', 'CMAT', 'MAT', 'GMAT'],
    required: function() {
      return this.testType === 'Previous Year Papers' || this.testType === 'Full-Length Tests';
    }
  },
  year: {
    type: Number,
    required: function() {
      return this.testType === 'Previous Year Papers';
    }
  },
  selectionMode: {
    type: String,
    enum: ['Paper Wise', 'Topic Wise', null],
    default: null,
    required: function() {
      return this.testType === 'Previous Year Papers';
    }
  },
  mainTopic: {
    type: String,
    enum: ['Verbal', 'LRDI', 'Quantitative Aptitude', null],
    default: null,
    required: function() {
      return this.selectionMode === 'Topic Wise';
    }
  },
  subTopic: {
    type: String,
    trim: true,
    default: null
  },
  duration: {
    type: Number,
    required: [true, 'Test duration is required'],
    min: [1, 'Duration must be at least 1 minute']
  },
  totalQuestions: {
    type: Number,
    default: 0
  },
  totalMarks: {
    type: Number,
    default: 0
  },
  sections: [{
    name: {
      type: String,
      required: true,
      enum: ['VARC', 'DILR', 'QA']
    },
    duration: {
      type: Number,
      required: true
    },
    totalQuestions: {
      type: Number,
      required: true
    },
    totalMarks: {
      type: Number,
      required: true
    },
    questions: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MockTestQuestion'
    }]
  }],
  instructions: {
    general: [{
      type: String
    }],
    sectionSpecific: {
      VARC: [String],
      DILR: [String],
      QA: [String]
    }
  },
  declaration: {
    title: {
      type: String,
      default: 'Test Declaration'
    },
    content: [{
      type: String
    }],
    requiresAcceptance: {
      type: Boolean,
      default: true
    }
  },
  isFree: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    default: 'Medium'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Admin',
    required: true
  },
  publishedAt: {
    type: Date
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TestCategory'
  }],
  attempts: [{
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    attemptId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'MockTestAttempt'
    },
    attemptedAt: {
      type: Date,
      default: Date.now
    },
    completed: {
      type: Boolean,
      default: false
    },
    score: {
      type: Number,
      default: 0
    },
    timeTaken: {
      type: Number,
      default: 0
    }
  }]
}, {
  timestamps: true
});

categorizedMockTestSchema.index({ testType: 1, examType: 1, isPublished: 1 });
categorizedMockTestSchema.index({ testType: 1, selectionMode: 1, mainTopic: 1, isPublished: 1 });
categorizedMockTestSchema.index({ isActive: 1, isPublished: 1 });
categorizedMockTestSchema.index({ year: 1, examType: 1 });

module.exports = mongoose.model('CategorizedMockTest', categorizedMockTestSchema);
