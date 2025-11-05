import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiChevronRight, FiFileText, FiBookOpen } from 'react-icons/fi';
import './PreviousYearPapers.css';

const PreviousYearPapers = () => {
  const navigate = useNavigate();
  const [selectionMode, setSelectionMode] = useState(null); // 'paper-wise' or 'topic-wise'
  const [selectedExam, setSelectedExam] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [selectedSubTopic, setSelectedSubTopic] = useState('');
  const [availableExams, setAvailableExams] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [availableSubTopics, setAvailableSubTopics] = useState([]);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(false);

  const mainTopics = [
    { id: 'Verbal', name: 'Verbal Ability' },
    { id: 'LRDI', name: 'Logical Reasoning & Data Interpretation' },
    { id: 'Quantitative Aptitude', name: 'Quantitative Aptitude' }
  ];

  useEffect(() => {
    if (selectionMode === 'paper-wise') {
      fetchAvailableExams();
    }
  }, [selectionMode]);

  useEffect(() => {
    if (selectedTopic && selectionMode === 'topic-wise') {
      fetchAvailableSubTopics();
    }
  }, [selectedTopic]);

  useEffect(() => {
    if ((selectionMode === 'paper-wise' && selectedExam) || 
        (selectionMode === 'topic-wise' && selectedTopic)) {
      fetchTests();
    }
  }, [selectedExam, selectedSubTopic]);

  const fetchAvailableExams = async () => {
    try {
      const response = await axios.get('/api/categorized-mock-tests/exams', {
        params: { testType: 'Previous Year Papers' }
      });
      setAvailableExams(response.data.exams || []);
    } catch (error) {
      console.error('Error fetching exams:', error);
    }
  };

  const fetchAvailableSubTopics = async () => {
    try {
      const response = await axios.get('/api/categorized-mock-tests/topics', {
        params: { mainTopic: selectedTopic }
      });
      setAvailableSubTopics(response.data.subTopics || []);
    } catch (error) {
      console.error('Error fetching sub-topics:', error);
    }
  };

  const fetchTests = async () => {
    setLoading(true);
    try {
      const params = {
        testType: 'Previous Year Papers',
        selectionMode: selectionMode === 'paper-wise' ? 'Paper Wise' : 'Topic Wise'
      };

      if (selectionMode === 'paper-wise' && selectedExam) {
        params.examType = selectedExam;
      }
      if (selectionMode === 'topic-wise') {
        params.mainTopic = selectedTopic;
        if (selectedSubTopic) {
          params.subTopic = selectedSubTopic;
        }
      }

      const response = await axios.get('/api/categorized-mock-tests/tests', { params });
      setTests(response.data.tests || []);
    } catch (error) {
      console.error('Error fetching tests:', error);
      setTests([]);
    } finally {
      setLoading(false);
    }
  };

  const handleModeSelection = (mode) => {
    setSelectionMode(mode);
    setSelectedExam('');
    setSelectedTopic('');
    setSelectedSubTopic('');
    setTests([]);
  };

  const handleTestClick = (testId) => {
    navigate(`/student/mock-tests/declaration/${testId}`);
  };

  if (!selectionMode) {
    return (
      <div className="previous-year-container">
        <div className="previous-year-header">
          <h1>Previous Year Papers</h1>
          <p>Choose how you'd like to practice</p>
        </div>

        <div className="mode-selection">
          <div className="mode-card" onClick={() => handleModeSelection('paper-wise')}>
            <div className="mode-icon">
              <FiFileText size={60} />
            </div>
            <h3>Paper Wise</h3>
            <p>Practice complete exam papers by year</p>
            <button className="mode-btn">Select</button>
          </div>

          <div className="mode-card" onClick={() => handleModeSelection('topic-wise')}>
            <div className="mode-icon">
              <FiBookOpen size={60} />
            </div>
            <h3>Topic Wise</h3>
            <p>Practice by subject and topics</p>
            <button className="mode-btn">Select</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="previous-year-container">
      <div className="previous-year-header">
        <button className="back-btn" onClick={() => setSelectionMode(null)}>
          ← Back
        </button>
        <h1>{selectionMode === 'paper-wise' ? 'Paper Wise' : 'Topic Wise'} Selection</h1>
      </div>

      <div className="selection-container">
        {selectionMode === 'paper-wise' ? (
          <>
            <div className="dropdown-section">
              <label>Select Exam</label>
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="exam-dropdown"
              >
                <option value="">Choose an exam...</option>
                {availableExams.map((exam) => (
                  <option key={exam} value={exam}>{exam}</option>
                ))}
              </select>
            </div>
          </>
        ) : (
          <>
            <div className="dropdown-section">
              <label>Select Main Topic</label>
              <select
                value={selectedTopic}
                onChange={(e) => {
                  setSelectedTopic(e.target.value);
                  setSelectedSubTopic('');
                }}
                className="exam-dropdown"
              >
                <option value="">Choose a topic...</option>
                {mainTopics.map((topic) => (
                  <option key={topic.id} value={topic.id}>{topic.name}</option>
                ))}
              </select>
            </div>

            {selectedTopic && availableSubTopics.length > 0 && (
              <div className="dropdown-section">
                <label>Select Sub-Topic</label>
                <select
                  value={selectedSubTopic}
                  onChange={(e) => setSelectedSubTopic(e.target.value)}
                  className="exam-dropdown"
                >
                  <option value="">All Sub-Topics</option>
                  {availableSubTopics.map((subTopic) => (
                    <option key={subTopic} value={subTopic}>{subTopic}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
      </div>

      {loading && (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading tests...</p>
        </div>
      )}

      {!loading && tests.length > 0 && (
        <div className="tests-grid">
          {tests.map((test) => (
            <div key={test._id} className="test-card" onClick={() => handleTestClick(test._id)}>
              <div className="test-header">
                <h3>{test.title}</h3>
                {test.year && <span className="test-year">{test.year}</span>}
              </div>
              <p className="test-description">{test.description}</p>
              <div className="test-meta">
                <span className="meta-item">
                  <FiChevronRight /> {test.duration} mins
                </span>
                <span className="meta-item">
                  <FiChevronRight /> {test.totalQuestions} questions
                </span>
                <span className="meta-item">
                  <FiChevronRight /> {test.totalMarks} marks
                </span>
              </div>
              <button className="start-test-btn">Start Test</button>
            </div>
          ))}
        </div>
      )}

      {!loading && tests.length === 0 && (selectedExam || selectedTopic) && (
        <div className="no-tests">
          <p>No tests available for the selected criteria</p>
        </div>
      )}
    </div>
  );
};

export default PreviousYearPapers;
