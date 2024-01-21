# news-api-aggregator
RESTful API using Node.js, Express.js, and NPM packages. The API will allow users to register, log in, and set their news preferences. The API will then fetch news articles from multiple sources using external news APIs. The fetched articles should be processed and filtered asynchronously on user preference.

# In addition,
Implements input validation and sanitization for user registration, event creation, and updates.

Optimizes performance by implementing caching.

Implements unit testing, focusing on testing input validation and proper functioning of CRUD operations to achieve good test coverage and test edge cases.

Refactors the API code to improve error handling, ensuring that appropriate error messages are returned for different types of errors (e.g., validation errors, authentication errors, authorization errors, and server errors).

Logging the API requests and responses for auditing purposes. Use a logging library like Winston or Morgan to log request and response data.

# How To Run The Project
## Clone the Repository

 ### https://github.com/bhagyashrimarghade/news-api-aggregator/

> Navigate to the Project Directory
--  cd news-api-aggregator

> Install the dependencies
--  npm install

> Run the project under dev dependencies
--  npm run dev

> Run the unit test
--  npm run test

# Architecture
## Controller
User Authentication:
Handles user registration, login, and token generation using bcrypt for password hashing and JWT (JSON Web Token) for authentication.

News Aggregation:
Manages user preferences, allowing users to set their preferred topics for news articles. Fetches news articles from external APIs based on user preferences.

## Authentication Middleware:
Verifies user authentication using JWT before processing requests that require authentication.

## services: news API
fetch data from news api based on user preferences

## It has mainly following apis ->

**1. /auth/register (post)** : register a user with following payload

**Payload = {
    "name": "test1",
    "email": "test1@gmail.com",
    "password": "123456789",
    "role": "admin",
    "preferences" : ["business","health"]
}**

**2. /auth/login (post)** : login in an application with following payload and generate accessToken using jwt

**Payload = {
    "email":"test1@gmail.com",
    "password":"123456789"
}**

**3. /user/preferences (get)** : Retrieve the news preferences for the logged-in user 
    
**Headers** : Authorization header required

**4. /user/preferences (put)** : Update the news preferences for the logged-in user and need following payload

**payload {
    "preferences":["technology","politics"]
}**

**Headers** : Authorization header required

**5 /user/newspreferences (get)** : Fetch news articles based on the logged-in user's preferences

**Headers** : Authorization header required
