# Exam Application

## Description

This application is designed to help you prepare for viva exams effectively. It allows you to set a large number of questions, organized by topic. Each day, you can simulate a viva by facing questions selected from the topics you've chosen.

One unique feature of the app is the audio option, which records your responses during the test. After completing the viva simulation, you can listen to these recordings to assess your performance and identify areas for improvement.

This tool is perfect for systematic and thorough viva preparation, enabling you to review and refine your answers in a structured way.

## Prerequisites

Before you start, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (comes with Node.js) or [Yarn](https://yarnpkg.com/)

## Installation

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/MdImranHosen1/Exam-Application-NextJs-ExpressJs
    cd Exam-Application-NextJs-ExpressJs
    ```

2.  **Install and Start Dependencies**

    - For the backend (Express.js):

      ```bash
      cd backend
      npm install
      npm start
      ```

      The backend will start and listen on `http://localhost:5000` (or any port specified in your configuration).

    - For the frontend (React.js):

      ```bash
      cd ../frontend
      rm -rf .next
      npm run build
      npm start

      ```

      The frontend will start and open in your default web browser at `http://localhost:3000`.

## Testing

If your application includes tests, you can run them with:

- For the backend:

  ```bash
  cd backend
  npm test
  ```

- For the frontend:

  ```bash
  cd frontend
  npm test
  ```

## Deployment

For deploying the application, you might need to follow specific instructions based on your hosting provider. Typically, you will build the frontend and configure your backend to serve static files from the `frontend/build` directory.

- **Build the frontend**:

  ```bash
  cd frontend
  npm run build
  ```

- **Serve the built files**:

  Ensure your Express backend is configured to serve static files from `frontend/build`.

## Screensort

- Home
  ![alt text](</Screensort/Screenshot from 2024-08-14 23-10-49.png>)
- Question
  ![alt text](</Screensort/Screenshot from 2024-08-14 23-15-48.png>)
- Overview
  ![alt text](</Screensort/Screenshot from 2024-08-14 23-16-23.png>)
- Add Question
  ![alt text](</Screensort/Screenshot from 2024-08-14 23-18-42.png>)
- Viva
  ![alt text](</Screensort/Screenshot from 2024-08-15 18-35-33.png>)

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -am 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Create a new Pull Request.
