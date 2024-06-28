# Network: A Social Media Web App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

Network is a simple social media application designed for modern web browsers. Built with vanilla JavaScript on the frontend and Django on the backend, Network offers an alternative to the bloated, complex social media platforms of today. Users can post text-based updates, connect with friends, and much more, all in a straightforward, user-friendly environment.

## Features

- **User Authentication**: Secure user authentication with Django's built-in system.
- **Post Updates**: Create, edit, and delete text-based posts.
- **Follow/Unfollow**: Build your network by following and unfollowing other users.
- **Likes and Comments**: Engage with posts by liking and commenting.

## To-be-added
- **Profile Customization**: Edit your profile picture, username, and bio.
- **Real-Time Notifications**: Get notified for new posts, likes, and comments in real-time.
- **Search Functionality**: Search for users and hashtags.
- **Responsive Design**: Looks great on both desktop and mobile.

## Technologies

- **Frontend**
  - Vanilla JavaScript
  - HTML5
  - CSS3
- **Backend**
  - Django
  - SQLite (default), but configurable

## Installation

### Requirements
- Python 3.x
- pip
  
### Steps

1. **Clone the repository**

    ```bash
    git clone https://github.com/Ahmed-Abbas-2077/Network.git
    ```

2. **Install Python dependencies**

    ```bash
    pip install -r requirements.txt
    ```

3. **Apply migrations**

    ```bash
    python manage.py migrate
    ```

4. **Run the development server**

    ```bash
    python manage.py runserver
    ```

5. Open your web browser and navigate to `http://127.0.0.1:8000/`.

## Usage

- **Registration**: First-time users should click the "Sign Up" button to create a new account.
- **Login**: If you already have an account, click the "Login" button and enter your credentials.
- **Dashboard**: After logging in, you'll be redirected to the dashboard where you can see posts from users you follow.
- **Profile**: Click on the profile picture icon to go to your profile. Here you can edit your details and view your posts.
- **Posting**: Use the "Create Post" button to add a new post.
- **Search**: Use the search bar at the top to find users or hashtags.

## Contributing

We encourage you to contribute to Network! Feel free to add your touch on the project.

---

For more information, please contact the developers via [email](mailto:ahmed.abbas.compsci@gmail.com) or create an issue on this repository.
