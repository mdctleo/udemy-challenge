# udemy-challenge
A simple quiz taking application

## Introduction

The problem is to design a quiz taking system as a full stack web application using an API endpoints approach.
The quiz should consists of one or more multiple choice questions.
My solution is a full stack solution using React + Redux, Flask and MongoDB.

## Back End

For back end I chose to use python with Flask, mainly because I have some experience with Flask while
it is similar to the stack used at Udemy. Due to the small amount of API endpoints, I implemented all of them
in app.py. Database.py consists of all database queries and it is used to act as a separate layer from the API endpoints.
All exceptions are centralized in one exceptions.py for easy control. A separate file/class is created for marking
and validating the quiz to further separate application logic from actual API endpoints.

All dependencies I've chose are quite straightforward. I would like to point out that the marshmallow library
is usually used to serialize python classes to json and json to python classes. Which I use often in other projects
but due to the nature of MongoDB documents being in JSON format, it is not used a lot in this project.

In terms of improvements:
*   The exception class msg is suppose to override default message thrown by Flask, it is instead a separate field,
which is not what I want
* Separate API layer away from app.py for more scalability for the future
* Use constant variables for database names instead of hardcoded strings

## Database

For database I am using MongoDB. It was a big internal battle between MySQL and MongoDB, I have way more 
experience with MySQL but it seems like the requirements are easier to implement with MongoDB. If the database
is implemented in MySQL, I can foresee at least three tables Quiz, Questions and Answers. Join queries would be
needed to get a quiz and a foreign key would be needed to relate answers to questions. While in MongoDB a Quiz
can just be a straightforward JSON document. The trade-off would be the transactional nature and the potential of complex queries
features of a traditional RDBMS. In addition to the horizontal scalability v.s. vertical scalability between NoSQL and SQL.

There are 3 collections in my database, quizzes, counters and responses. Quizzes collection holds
quiz documents and responses collection holds response documents to quizzes. The counters collection
is made to create an auto-increment column on the quiz documents.

Improvements:
* Add picture to quiz documents

## Front End
For front end I am using React + Redux because I have experience with React before and it is a stack
used at Udemy. Each quiz question is represented by a question-container component, which is made up of question component
and options component. I try to put more logic in the container component while the smaller components are
more "dumb" with more stuff passed to them as props. The controls component is used to control the flow of the application.

For dependencies, other than the regular ones I added antd and superagent. The former is a design/components
library I like even though it is quite verbose in size while the latter is the request library of my preference.

Improvements:
* The actual App.js right now is quite verbose, I would like to further break it into components (like a Quiz component)
* I am cheesing my way out of using something like react-router, I feel like the results page should be re-directed to a new
url instead of conditional rendering
* Improve user experience by adding in some animated transitions while moving between questions
* Improve mobile user experience in general e.g. by having swipe for controlling flows instead of clicking buttons
* Get rid of default files and logos from create-react-app

## Deployment
The application is currently deployed on aws. The front end is built then served by Nginx and Nginx
acts as a reverse proxy for api calls. Flask back end is ran with gunicorn and persisted with pm2 while
mongodb is ran and persisted with service.

Improvements:
* Webpack + Babel for front end for better backwards compatibility and performance
* Automating deployment process
* With better containerization and knowledge of Kubernetes, the application can be deployed to Kubernetes
so the front end, back end and database can scale independently
* SSL certificate (which does not work with amazon's url and needs a custom domain I believe) and custom domain (this costs money and I am unemployed)

## Testing
I used Pytest and my eyes to test the program right now.

Improvement:
* Add end to end tests
