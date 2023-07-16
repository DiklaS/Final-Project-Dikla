# Node JS Project

### Description
This project is a Node.js server developed for an internet application that includes a content management system (CMS). The server provides a platform for business users to publish, edit, and delete content on their website. 
The project repository can be found at https://github.com/DiklaS/NodeJS-Project.git.

### Technologies Used
- Node.js
- Express.js
- MongoDB
- bcryptjs
- chalk
- config
- cookie-parser
- cors
- cross-env
- debug
- joi
- jsonwebtoken
- lodash
- mongoose
- morgan
- nodemon (devDependency)

### Features
Handles HTTP requests and responses.
Can handle various HTTP methods (GET, POST, PUT, DELETE, etc.).
Supports routing to different endpoints.
Can handle static file serving.
Easy to configure and customize.
Scalable and can be extended with additional modules.

### Installation
Clone the project repository from GitHub.
Install Node.js (version at least 18) from Node.js official website.
Open a terminal and navigate to the project directory.
Run the command npm install to install the project dependencies.

### Configuration
Open the config.js file in the project root directory.
Customize the server configuration options such as port number and other settings.

### Usage
Open a terminal and navigate to the project directory.
To start the Node.js server in a production environment, use the following command: npm start
To start the Node.js server in a development environment with additional features like automatic code reloading, use the following command: npm run dev
The server will start running and listen for incoming requests on the specified port.
Access the server by opening a web browser and navigating to http://localhost:<port>, where <port> is the configured port number.  

### Available Routes
#### Users end points
* Register User: POST http://localhost:8181/api/users/
* Login: POST http://localhost:8181/api/users/login
* Get all users: GET http://localhost:8181/api/users/ (for admin users only)
* Get User: GET http://localhost:8181/api/users/:id (for the registered user or admin)
* Edit User: PUT http://localhost:8181/api/users/:id (for the registered user)
* Change business status: PATCH http://localhost:8181/api/users/:id (for the registered user)
* Delete User: DELETE http://localhost:8181/api/users/:id (for the registered user or admin)

#### Cards end points
* Get all cards: GET http://localhost:8181/api/cards
* Get my cards: GET http://localhost:8181/api/cards/my-cards (for the registered user)
* Get Card: GET http://localhost:8181/api/cards/:id 
* Create new card: POST http://localhost:8181/api/cards (for business users)
* Edit Card: PUT http://localhost:8181/api/cards/:id (for the user who created the card)
* Like Card: PATCH http://localhost:8181/api/cards/:id (for the the registered user)
* Delete Card: DELETE http://localhost:8181/api/cards/:id (for the user who created the card or admin)
* Change business number: PATCH http://localhost:8181/api/cards//bizNumber/:id (for admin)

### License
This project is licensed under the MIT License.

### Created By
This project was created by Dikla Shaked as part of Full Stack Development course.

