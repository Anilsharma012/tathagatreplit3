import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiBook, FiTarget, FiClock, FiLayers } from 'react-icons/fi';
import './MockTestSelection.css';

const MockTestSelection = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const mainCategories = [
    {
      id: 'previous-year',
      name: 'Previous Year Papers',
      icon: <FiBook size={48} />,
      description: 'Practice with actual exam papers from previous years',
      color: '#4CAF50'
    },
    {
      id: 'full-length',
      name: 'Full-Length Tests',
      icon: <FiTarget size={48} />,
      description: 'Complete mock tests simulating real exam conditions',
      color: '#2196F3'
    },
    {
      id: 'sessional',
      name: 'Sessional Tests',
      icon: <FiClock size={48} />,
      description: 'Topic-wise practice tests for focused preparation',
      color: '#FF9800'
    },
    {
      id: 'module',
      name: 'Module Tests',
      icon: <FiLayers size={48} />,
      description: 'Section-specific tests for targeted improvement',
      color: '#9C27B0'
    }
  ];

  const handleCategoryClick = (categoryId) => {
    switch (categoryId) {
      case 'previous-year':
        navigate('/student/mock-tests/previous-year');
        break;
      case 'full-length':
        navigate('/student/mock-tests/full-length');
        break;
      case 'sessional':
        navigate('/student/mock-tests/sessional');
        break;
      case 'module':
        navigate('/student/mock-tests/module');
        break;
      default:
        break;
    }
  };

  return (
    <div className="mock-test-selection-container">
      <div className="mock-test-selection-header">
        <h1>Mock Test Selection</h1>
        <p>Choose your test category to begin your preparation journey</p>
      </div>

      <div className="category-grid">
        {mainCategories.map((category) => (
          <div
            key={category.id}
            className={`category-card ${selectedCategory === category.id ? 'selected' : ''}`}
            onClick={() => handleCategoryClick(category.id)}
            style={{ '--category-color': category.color }}
          >
            <div className="category-icon" style={{ color: category.color }}>
              {category.icon}
            </div>
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <button 
              className="category-btn"
              style={{ backgroundColor: category.color }}
            >
              Select
            </button>
          </div>
        ))}
      </div>

      <div className="test-info-section">
        <div className="info-card">
          <h4>📊 Track Your Progress</h4>
          <p>Monitor your performance across different test categories</p>
        </div>
        <div className="info-card">
          <h4>⏱️ Time Management</h4>
          <p>Practice with real exam timers to improve speed</p>
        </div>
        <div className="info-card">
          <h4>📈 Detailed Analytics</h4>
          <p>Get comprehensive reports after each test</p>
        </div>
      </div>
    </div>
  );
};

export default MockTestSelection;
