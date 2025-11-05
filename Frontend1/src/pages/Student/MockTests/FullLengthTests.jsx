import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiChevronRight, FiClock, FiFileText, FiAward } from 'react-icons/fi';
import './FullLengthTests.css';

const FullLengthTests = () => {
  const navigate = useNavigate();
  const [selectedExam, setSelectedExam] = useState('');
  const [availableExams, setAvailableExams] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAvailableExams();
  }, []);

  useEffect(() => {
    if (selectedExam) {
      fetchTests();
    }
  }, [selectedExam]);

  const fetchAvailableExams = async () => {
    try {
      const response = await axios.get('/api/categorized-mock-tests/exams', {
        params: { testType: 'Full-Length Tests' }
      });
      setAvailableExams(response.data.exams || []);
      if (response.data.exams && response.data.exams.length > 0) {
        setSelectedExam(response.data.exams[0]);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchTests = async () => {
    setLoading(true);
    try {
      const params = {
        testType: 'Full-Length Tests',
        examType: selectedExam
      };

      const response = await axios.get('/api/categorized-mock-tests/tests', { params });
      setTests(response.data.tests || []);
    } catch (error) {
      console.error('Error fetching tests:', error);
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTestClick = (testId) => {
    navigate(`/student/mock-tests/declaration/${testId}`);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return '#4CAF50';
      case 'Medium': return '#FF9800';
      case 'Hard': return '#f44336';
      default: return '#666';
    }
  };

  return (
    <div className="full-length-container">
      <div className="full-length-header">
        <button className="back-btn" onClick={() => navigate('/student/mock-tests')}>
          ← Back to Categories
        </button>
        <h1>Full-Length Mock Tests</h1>
        <p>Complete mock tests simulating real exam conditions</p>
      </div>

      <div className="exam-filter-section">
        <label>Select Exam Type</label>
        <div className="exam-chips">
          {availableExams.map((exam) => (
            <button
              key={exam}
              className={`exam-chip ${selectedExam === exam ? 'active' : ''}`}
              onClick={() => setSelectedExam(exam)}
            >
              {exam}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading tests...</p>
        </div>
      )}

      {!loading && tests.length > 0 && (
        <div className="tests-container">
          <div className="tests-header-info">
            <h2>{selectedExam} Full-Length Tests</h2>
            <p>{tests.length} test{tests.length !== 1 ? 's' : ''} available</p>
          </div>

          <div className="tests-grid">
            {tests.map((test) => (
              <div key={test._id} className="full-length-test-card" onClick={() => handleTestClick(test._id)}>
                <div className="test-badge-container">
                  {test.isFree && <span className="free-badge">FREE</span>}
                  <span 
                    className="difficulty-badge" 
                    style={{ backgroundColor: getDifficultyColor(test.difficulty) }}
                  >
                    {test.difficulty}
                  </span>
                </div>

                <div className="test-icon">
                  <FiFileText size={40} />
                </div>

                <h3>{test.title}</h3>
                <p className="test-description">{test.description}</p>

                <div className="test-stats">
                  <div className="stat-item">
                    <FiClock />
                    <span>{test.duration} mins</span>
                  </div>
                  <div className="stat-item">
                    <FiFileText />
                    <span>{test.totalQuestions} questions</span>
                  </div>
                  <div className="stat-item">
                    <FiAward />
                    <span>{test.totalMarks} marks</span>
                  </div>
                </div>

                {test.sections && test.sections.length > 0 && (
                  <div className="sections-info">
                    <h4>Sections:</h4>
                    <div className="sections-list">
                      {test.sections.map((section, index) => (
                        <span key={index} className="section-tag">
                          {section.name} ({section.totalQuestions}Q)
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <button className="start-test-btn-full">
                  Start Full Test
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && tests.length === 0 && selectedExam && (
        <div className="no-tests">
          <FiFileText size={60} />
          <p>No {selectedExam} full-length tests available at the moment</p>
          <p className="sub-text">Check back later for new tests</p>
        </div>
      )}
    </div>
  );
};

export default FullLengthTests;
