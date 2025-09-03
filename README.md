
# Habit Tracker

A simple web-based Habit Tracker application built with **Node.js**, **Express**, **MongoDB**, and vanilla **JavaScript**. Track your daily habits, monitor streaks, and visualize progress on a dashboard.

---

## Features

- Add new habits
- Mark habits as done for today
- View streak count for each habit
- Edit or delete habits
- Dashboard shows completion progress
- Dark mode toggle
- Responsive design

---

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Others:** CORS, Fetch API

---

## Installation

1. **Clone the repository**

git clone https://github.com/your-username/habit-tracker.git
cd habit-tracker


2. **Install dependencies**


npm install


3. **Start MongoDB**


brew services start mongodb-community@6.0


or if using a custom db path:


mongod --dbpath ~/data/db

and mongosh

4. **Run the server**


node server.js


5. **Open the frontend**

Open `index.html` in your browser or visit `http://localhost:5050` if served through Express.

---

## Project Structure


habit-tracker/
├─ frontend/
│  ├─ index.html
│  ├─ style.css
│  └─ script.js
├─ models/
│  └─ Habit.js
├─ routes/
│  └─ habits.js
├─ config/
│  └─ db.js
├─ server.js
├─ package.json
└─ README.md


---

## API Endpoints

* `GET /habits` — Get all habits
* `POST /habits` — Add a new habit (`{ name: "Habit Name", userId: "1" }`)
* `PUT /habits/:id/progress` — Mark a habit done today
* `GET /habits/:id/streak` — Get habit streak
* `PUT /habits/:id` — Edit habit name
* `DELETE /habits/:id` — Delete a habit

---

## Screenshots

*([Add some screenshots of your app here for better presentation](https://drive.google.com/drive/folders/114f4JngmlJcpsStUcZdVqyOUwa66EcLN?usp=drive_link))*


