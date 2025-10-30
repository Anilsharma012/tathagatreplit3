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
2. Mock test and practice test system
3. Live class management with Zoom integration
4. Admin panel for course and content management
5. Discussion forum
6. Study materials management
7. IIM predictor tool
8. CRM for lead management

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
