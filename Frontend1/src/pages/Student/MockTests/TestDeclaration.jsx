import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiClock, FiFileText, FiAward, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import './TestDeclaration.css';

const TestDeclaration = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [accepted, setAccepted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  const fetchTestDetails = async () => {
    try {
      const response = await axios.get(`/api/categorized-mock-tests/test/${testId}/details`);
      setTest(response.data.test);
    } catch (error) {
      console.error('Error fetching test details:', error);
      setError('Failed to load test details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleStartTest = () => {
    if (!accepted) {
      alert('Please accept the declaration to continue');
      return;
    }
    // Navigate to the test interface
    navigate(`/student/mock-tests/attempt/${testId}`);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="declaration-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading test details...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="declaration-container">
        <div className="error-state">
          <FiAlertCircle size={60} />
          <p>{error || 'Test not found'}</p>
          <button onClick={handleGoBack} className="back-button">Go Back</button>
        </div>
      </div>
    );
  }

  const defaultDeclaration = {
    title: 'Test Declaration',
    content: [
      'I have read and understood all the instructions.',
      'I am ready to take this test under exam conditions.',
      'I understand that once started, the timer cannot be paused.',
      'I will not use any unfair means during the test.',
      'I accept that my responses will be automatically saved.'
    ]
  };

  const declaration = test.declaration || defaultDeclaration;

  return (
    <div className="declaration-container">
      <div className="declaration-card">
        <div className="declaration-header">
          <h1>{test.title}</h1>
          <p className="test-type-badge">{test.testType}</p>
        </div>

        <div className="test-overview">
          <div className="overview-item">
            <FiClock className="overview-icon" />
            <div>
              <span className="overview-label">Duration</span>
              <span className="overview-value">{test.duration} minutes</span>
            </div>
          </div>
          <div className="overview-item">
            <FiFileText className="overview-icon" />
            <div>
              <span className="overview-label">Questions</span>
              <span className="overview-value">{test.totalQuestions}</span>
            </div>
          </div>
          <div className="overview-item">
            <FiAward className="overview-icon" />
            <div>
              <span className="overview-label">Total Marks</span>
              <span className="overview-value">{test.totalMarks}</span>
            </div>
          </div>
        </div>

        {test.sections && test.sections.length > 0 && (
          <div className="sections-overview">
            <h3>Test Sections</h3>
            <div className="sections-grid">
              {test.sections.map((section, index) => (
                <div key={index} className="section-card-small">
                  <h4>{section.name}</h4>
                  <div className="section-details">
                    <span>{section.totalQuestions} Questions</span>
                    <span>{section.duration} mins</span>
                    <span>{section.totalMarks} marks</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="instructions-section">
          <h3>General Instructions</h3>
          <ul className="instructions-list">
            {test.instructions?.general?.map((instruction, index) => (
              <li key={index}>
                <FiCheckCircle /> {instruction}
              </li>
            )) || (
              <>
                <li><FiCheckCircle /> Read each question carefully before answering</li>
                <li><FiCheckCircle /> You can navigate between questions using the question palette</li>
                <li><FiCheckCircle /> Mark questions for review if you're unsure</li>
                <li><FiCheckCircle /> Submit your test before time runs out</li>
              </>
            )}
          </ul>
        </div>

        <div className="declaration-section">
          <h3>{declaration.title}</h3>
          <div className="declaration-content">
            {declaration.content.map((point, index) => (
              <div key={index} className="declaration-point">
                <FiCheckCircle className="check-icon" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="acceptance-checkbox">
            <input
              type="checkbox"
              id="accept-declaration"
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            <label htmlFor="accept-declaration">
              I have read and accept all the above terms and conditions
            </label>
          </div>
        </div>

        <div className="action-buttons">
          <button onClick={handleGoBack} className="cancel-button">
            Cancel
          </button>
          <button
            onClick={handleStartTest}
            className={`start-button ${!accepted ? 'disabled' : ''}`}
            disabled={!accepted}
          >
            {accepted ? 'Start Test Now' : 'Accept Declaration to Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestDeclaration;
