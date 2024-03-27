# Tasks Manager App

The Tasks Manager App is a web-based application designed to help users manage their tasks efficiently. This app provides a user-friendly interface for creating, editing, and organizing tasks across different boards.

## Features

- **Dashboard:** 
  - Contains a sidebar for navigation.
  - Boards where you can add, edit, and delete tasks.

- **Board Management:**
  - Create new boards.
  - Edit existing boards.
  - Delete boards when necessary.

- **Task Management:**
  - Add tasks to specific boards.
  - Edit task details.
  - Update task statuses (e.g., in progress, completed).

- **Forms:**
  - Form to add new boards.
  - Form to add new tasks.
  - Form to update existing tasks.

## Technologies Used

- **Frontend:**
  - HTML/CSS
  - JavaScript
  - React.js

- **Backend:**
  - Python
  - Flask
  - MongoDB (using PyMongo)

## Installation

To run the Tasks Manager App locally, follow these steps:

1. Clone this repository to your local machine:

### `git clone <repository-url>`

2. Navigate to the project directory:

### `cd tasks-manager-app`

3. Install frontend dependencies:

### `npm install`

4. Start the frontend development server:

### `npm start`

5. Navigate to the backend directory:

### `cd backend`

6. Install backend dependencies (make sure you have Python and pip installed):

### `pip install Flask pymongo Flask-Cors`

7. Start the backend server:

### `python app.py`

8. Open your browser and go to `http://localhost:3000` to view the app.

## Usage

1. **Dashboard:**
- Navigate through different boards using the sidebar.
- Create new boards using the provided form.
- Edit existing boards by clicking on the edit icon.
- Delete boards by clicking on the delete icon.

2. **Tasks:**
- Add new tasks to a specific board using the task form.
- Edit task details by clicking on the edit button.
- Update task status using the task status checkbox.

## Screenshots

*Dashboard view of the Tasks Manager App.*
<img width="884" alt="dashboard" src="https://github.com/douaa-amran/TasksManager/assets/120199553/404e72e7-15a9-4a94-87d6-96a07465dde1">

*Task view of a board.*
<img width="875" alt="tasks" src="https://github.com/douaa-amran/TasksManager/assets/120199553/d499ee3e-8d83-492c-bcc1-3cbb5633138a">

*Task form for adding new tasks to a board.*
<img width="875" alt="addtask" src="https://github.com/douaa-amran/TasksManager/assets/120199553/03f6f511-2b91-42f9-acca-bede102ee765">



## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please feel free to open an issue or submit a pull request.
