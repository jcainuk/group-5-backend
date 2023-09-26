# Picture-This-Place API

The backend API for Picture-This-Place, an app that encourages local exploration, social engagement, and gameplay by allowing users to submit photos of places, and others must guess the location based on the photo. Users earn points for correct guesses and compete on leaderboards.

## The Team

Picture-This-Place was developed by a team of five enthusiastic software engineers during their final project at [Northcoders](https://northcoders.com/), a software engineering bootcamp that enables career-changers to become developers in 13 weeks.

- [Jay7806](https://github.com/Jay7806)
- [Harrywg](https://github.com/Harrywg)
- [Lawler45](https://github.com/Lawler45)
- [A-E-Harding](https://github.com/A-E-Harding)
- [jcainuk](https://github.com/jcainuk)

## Table of Contents

- [Live Demo](#live-demo)
- [Technologies Used](#technologies-used)
- [Project Description](#project-description)
- [API Endpoints](#api-endpoints)
  - [1. `GET /api`](#1-get-api)
  - [User Endpoints](#user-endpoints)
    - [2. `GET /api/users`](#2-get-apiusers)
    - [3. `POST /api/users`](#3-post-apiusers)
    - [4. `GET /api/users/:id`](#4-get-apiusersid)
    - [5. `PATCH /api/users/:id`](#5-patch-apiusersid)
    - [6. `DELETE /api/users/:id`](#6-delete-apiusersid)
  - [Place Endpoints](#place-endpoints)
    - [7. `GET /api/places`](#7-get-apiplaces)
    - [8. `POST /api/places`](#8-post-apiplaces)
    - [9. `GET /api/places/:id`](#9-get-apiplacesid)
    - [10. `DELETE /api/places/:id`](#10-delete-apiplacesid)
    - [11. `POST /api/places/:id/guesses`](#11-post-apiplacesidguesses)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Create Environment Variables](#create-environment-variables)
  - [Running the Server](#running-the-server)
  - [Running Tests](#running-tests)
- [Future Improvements](#future-improvements)
- [Team Members](#authors)

## Live Demo

Link to live demo TBA...

## Technologies Used

List the technologies and libraries used in our project's backend.

- **Node.js**: The runtime environment for running JavaScript on the server-side.
- **Express.js**: A web application framework for Node.js, used to build our API endpoints.
- **MongoDB**: A NoSQL database used to store and manage our application's data.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js, used to interact with MongoDB in a more structured manner.
- **dotenv**: A package used for loading environment variables from a `.env` file into `process.env`, which is essential for storing sensitive information like database connection strings securely.
- **cors**: A package that helped us to handle Cross-Origin Resource Sharing (CORS) in our API, allowing our frontend to make requests to our backend from different origins.
- **nodemon**: A development tool that monitors changes in our source code files and automatically restarts the server when changes are detected, making the development process smoother.
- **Jest**: A popular JavaScript testing framework for writing and running tests for our application.
- **supertest**: A package that allowed us to make HTTP requests to our API endpoints and assert the responses in our tests.

## Project Description

Picture-This-Place is an app that promotes local exploration, social engagement, and fun gameplay. Users can create accounts, submit photos of places, and challenge others to guess the location. Points are awarded for correct guesses, and users can compete on leaderboards. It's an interactive way to encourage people to get out of the house, explore their surroundings, and connect with others in their local area.

## API Endpoints

#### 1. `GET /api`

- Description: Serves up a JSON representation of all the available endpoints of the API

### User Endpoints

#### 2. `GET /api/users`

- Description: Get a list of users

#### 3. `POST /api/users`

- Description: Create a new user
- Request Body:

```
  {
    "username": "String - Username of the user",
    "avatar_URL": "String (optional) - URL of the user's avatar",
    "achievements": {
      "gold": "Number (optional) - Number of gold achievements",
      "silver": "Number (optional) - Number of silver achievements",
      "bronze": "Number (optional) - Number of bronze achievements"
    }
  }

```

- Example Response:

```
 {
 "username": "new_user",
 "avatar_URL": "https://example.com/avatar/new_user.jpg",
 "achievements": {
   "gold": 0,
   "silver": 0,
   "bronze": 0
 }
 }
```

#### 4. `GET /api/users/:id`

- Description: Get a user by ID

#### 5. `PATCH /api/users/:id`

- Description: Update a user's information
- Request Body:

```
  {
  "avatar_URL": "String (optional) - Updated URL of the user's avatar",
  "achievements": {
  "gold": "Number (optional) - Number of gold achievements to add",
  "silver": "Number (optional) - Number of silver achievements to add",
  "bronze": "Number (optional) - Number of bronze achievements to add"
  }
}
```

- Example Response:

```
  {
  "username": "updated_user",
  "avatar_URL": "https://example.com/avatar/updated_user.jpg",
  "achievements": {
  "gold": 5,
  "silver": 3,
  "bronze": 2
  }
  }
```

#### 6. DELETE `/api/users/:id`

- Description: Delete a user by ID

## Place Endpoints

#### 7. `GET /api/places`

- Description: Get a list of places

#### 8. `POST /api/places`

- Description: Create a new place
- Request Body:

```
{
"placeName": "String - Name of the place",
"coordinates": [
"Number - Latitude of the place",
"Number - Longitude of the place"
],
"creator": "String - Creator of the place",
"imgURL": "String - URL of the place's image",
"guesses": [
{
"user_id": "String - User ID",
"username": "String - User's username",
"avatarURL": "String - URL of the user's avatar",
"distance": "Number - Distance",
"medal": "String - Medal type",
"guessCoordinates": [
"Number - Latitude of the guess",
"Number - Longitude of the guess"
]
}
],
"votes": "Number (optional) - Number of votes"
}
```

Example Response:

```
{
"placeName": "new_place",
"coordinates": [53.4808, -2.2426],
"creator": "creator_user",
"imgURL": "https://example.com/place/new_place.jpg",
"guesses": [],
"votes": 0
}
```

#### 9. `GET /api/places/:id`

- Description: Get a place by ID

#### 10. `DELETE /api/places/:id`

- Description: Delete a place by ID

#### 11. `POST /api/places/:id/guesses`

- Description: Add a new guess to the place (where :id is the place ID)

- Request Body:

```
  {
  "username": "String - User's username",
  "avatarURL": "String - URL of the user's avatar",
  "guessCoordinates": [
  "Number - Latitude of the guess",
  "Number - Longitude of the guess"
  ]
  }
```

## Setup Instructions

### Prerequisites

    Node.js (minimum version: 14.20.1)
    MongoDB

### Clone the Repository

```
    git clone [repository URL]
    cd [project directory]
```

### Install Dependencies

```
 npm install
```

### Create Environment Variables

Create a .env file in the project root and add the necessary environment variables.

```
PORT= // Your port number
MONGO_URI= // Your MONGO_URI

```

## Running the Server

Start the server using:

```
npm run seed // to seed the database for the first time
npm run dev // to start up the server

```

## Running Tests

- Run tests to ensure everything is working as expected:

```
npm test
```

## Future Improvements

- To be announced...

## Team Members

- [Jay7806](https://github.com/Jay7806)
- [Harrywg](https://github.com/Harrywg)
- [Lawler45](https://github.com/Lawler45)
- [A-E-Harding](https://github.com/A-E-Harding)
- [jcainuk](https://github.com/jcainuk)
