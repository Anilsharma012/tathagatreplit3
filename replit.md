# Tathagat - CAT Exam Preparation Platform

## Overview
Full-stack educational platform for CAT (Common Admission Test) preparation with comprehensive course management, mock tests, live classes, and student progress tracking.

## Project Structure
- **Backend** (`backend1/`): Node.js/Express API server
  - Port: 5000 (backend API)
  - Database: MongoDB Atlas
  - Features: Course management, user authentication, mock tests, live classes, payment integration
  
- **Frontend** (`Frontend1/`): React application
  - Port: 5000 (production setup for Replit)
  - Features: Student dashboard, course viewer, mock test interface, admin panel

## Technology Stack
- **Backend**: Node.js, Express, MongoDB (Mongoose), JWT authentication
- **Frontend**: React, React Router, Axios, Chart.js
- **External Services**: Razorpay (payments), Zoom (live classes), Nodemailer (emails)

## Recent Changes
- **November 5, 2025**: Implemented comprehensive Student LMS Mock Test Interface
  - Created categorized mock test system with 4 main categories (Previous Year Papers, Full-Length Tests, Sessional Tests, Module Tests)
  - Built hierarchical test selection flow with Paper Wise and Topic Wise options
  - Added Test Declaration page with acceptance workflow
  - Created backend models (TestCategory, CategorizedMockTest) and API endpoints
  - Integrated new navigation system with existing student routes
- Imported from GitHub (October 27, 2025)
- Configured for Replit environment
- Updated port configuration: Backend (3001), Frontend (5000)
- Enabled host check bypass for Replit proxy support
- Configured deployment settings for VM deployment

## Environment Setup
- **Backend**: Runs on localhost:3001
- **Frontend**: Runs on 0.0.0.0:5000 (public-facing)
- **Database**: MongoDB Atlas (pre-configured)
- **Development Mode**: Enabled with sample data seeding
- **Proxy**: Frontend proxies API requests to backend on port 3001

## Key Features
1. Student Dashboard with course progress tracking
2. **Enhanced Mock Test System** (NEW)
   - Categorized test navigation (Previous Year Papers, Full-Length Tests, Sessional Tests, Module Tests)
   - Paper Wise selection (by exam: CAT, XAT, SNAP, XSAT, etc.)
   - Topic Wise selection (by subject: Verbal, LRDI, Quantitative Aptitude with sub-topics)
   - Test Declaration page with acceptance workflow
   - Admin-configurable test categories and hierarchy
3. Practice test system
4. Live class management with Zoom integration
5. Admin panel for course and content management
6. Discussion forum
7. Study materials management
8. IIM predictor tool
9. CRM for lead management

## Running the Project

### Development
The project uses a single workflow that runs both frontend and backend:
- Workflow: `Frontend` (runs `npm run dev:full` in Frontend1 directory)
- This starts both the React frontend (port 5000) and Express backend (port 3001)

### Environment Variables
- Backend environment variables are configured in `backend1/.env`
- MongoDB connection string is pre-configured
- JWT secret is set for authentication
- Email service (SMTP) is configured for notifications

### Important Notes
- The frontend uses `DANGEROUSLY_DISABLE_HOST_CHECK=true` to work with Replit's proxy
- Backend runs on localhost (not exposed publicly)
- Frontend proxies all `/api` requests to the backend on port 3001
- Sample data seeding is controlled by the `SKIP_SEED` environment variable

### Known Issues
- **React Compilation**: The frontend is a large React application that may take 2-3 minutes to compile on first start
- Memory optimizations have been added (`NODE_OPTIONS=--max-old-space-size=8192`, `GENERATE_SOURCEMAP=false`) 
- If the frontend fails to start, the workflow will automatically retry
- The backend API is fully functional and accessible at `http://localhost:3001/api`

### Deployment
- Configured for VM deployment (stateful application)
- Runs the same `dev:full` command that starts both services
- MongoDB Atlas is used for production database

## New Feature: Categorized Mock Test Interface

### Backend Architecture
**Models:**
- `TestCategory.js`: Hierarchical category management (Main → Exam/Topic → SubTopic)
- `CategorizedMockTest.js`: Extended mock test model with categorization support

**API Endpoints:**
- Student Routes (`/api/categorized-mock-tests`):
  - `GET /categories`: Get test categories for navigation
  - `GET /tests`: Get tests by category filters
  - `GET /test/:testId/details`: Get test details with declaration
  - `GET /exams`: Get available exam types
  - `GET /years`: Get available years for previous year papers
  - `GET /topics`: Get available topics and subtopics

- Admin Routes (`/api/admin/categorized-mock-tests`):
  - `POST /categories`: Create test category
  - `GET /categories`: Get all categories
  - `PUT /categories/:categoryId`: Update category
  - `DELETE /categories/:categoryId`: Delete category
  - `POST /tests`: Create categorized test
  - `GET /tests`: Get all categorized tests
  - `PUT /tests/:testId`: Update test
  - `PUT /tests/:testId/publish`: Toggle test publication
  - `DELETE /tests/:testId`: Delete test

### Frontend Components
**Student Pages:**
- `MockTestSelection.jsx`: Main navigation with 4 category cards
- `PreviousYearPapers.jsx`: Selection flow with Paper Wise/Topic Wise modes
- `FullLengthTests.jsx`: Full-length test listing with exam filters
- `TestDeclaration.jsx`: Test instructions and declaration acceptance page

**Routes:**
- `/student/mock-tests`: Main test selection page
- `/student/mock-tests/previous-year`: Previous year papers flow
- `/student/mock-tests/full-length`: Full-length tests
- `/student/mock-tests/declaration/:testId`: Test declaration page
- `/student/mock-tests/attempt/:testId`: Test attempt interface

### Admin Interface (Pending)
The admin interface for managing test categories and categorized tests is planned for future implementation. Current features can be managed through API endpoints directly.
