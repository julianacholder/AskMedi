# AskMedi - Medical Diagnosis Application

AskMedi is a web-based application that provides users with preliminary medical diagnoses based on reported symptoms. It utilizes a React frontend for a smooth, interactive user experience.

## Table of Contents

1. [Features](#features)
2. [Technologies Used](#technologies-used)
3. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
4. [Usage](#usage)
5. [Project Structure](#project-structure)
6. [API Endpoints](#api-endpoints)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Features

- User authentication (signup, login, logout)
- Chatbot interface for symptom reporting
- AI-powered preliminary medical diagnosis
- User profile management
- View and download past diagnosis reports

## Technologies Used

- React.js
- React Router for navigation
- Axios for API requests
- CSS for styling
- JWT for authentication
- Node.js
- Django

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)

### Installation

1. Clone the repository:
https://github.com/julianacholder/AskMedi.git

2. Navigate to the project directory:
cd askmedi

3. Install dependencies:
npm install

4. Start the development server:
npm start

The application should now be running on `http://localhost:3000`.

## Usage

1. Sign up for a new account or log in if you already have one.
2. Navigate to the chatbot interface.
3. Describe your symptoms when prompted by the chatbot.
4. Receive a preliminary diagnosis based on your reported symptoms.
5. View your diagnosis history in the user report section.
6. Download your diagnosis reports as needed.

## Project Structure
src/
|-- components/
|   |-- Auth/
|   |   |-- Login.js
|   |   |-- Signup.js
|   |-- ChatBot/
|   |   |-- ChatComponent.js
|   |-- UserReport/
|   |   |-- UserReport.js
|   |-- Navbar.js
|-- pages/
|   |-- Home.js
|   |-- Profile.js
|-- services/
|   |-- api.js
|   |-- auth.js
|-- App.js
|-- index.js

## API Endpoints

- POST /api/auth/signup - User registration
- POST /api/auth/login - User login
- GET /api/users/me - Get user profile
- POST /api/chat - Send message to chatbot
- GET /api/reports - Get user's diagnosis reports
- POST /api/reports/download - Download a specific report

## Contributing

We welcome contributions to AskMedi! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Contact

Name - Juliana Crystal Holder
email: j.holder@alustudent.com

Project Link: [https://github.com/julianacholder/AskMedi.git]
Deployed Version: [https://ask-medi-julianacholders-projects.vercel.app/]
