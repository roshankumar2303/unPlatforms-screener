# unPlatforms - Screener
This repository contains the submission for unPlatforms screener round.

## Table of Contents
- [Requirements](#requirements)
- [Installing Dependencies](#installing-dependencies)
- [Running the Solution](#running-the-solution)
	- [Configuring Sequelize](#configuring-sequelize)
	- [Starting the Express server](#starting-the-express-server)
	- [Starting the React Application](#starting-the-react-application)

## Requirements
To run the solution/application, the following softwares are required:
- MySQL Community - [Download MySQL installer](https://dev.mysql.com/downloads/installer/ "Download MySQL installer")
- Node.js - [Download Node.js](https://nodejs.org/en/)

## Installing Dependencies
For installing dependencies in the frontend (React Application):
- In the terminal, change directory to `user-feed-frontend` folder
- Run `npm install`

For installing dependencies in the backend (Express, Sequelize):
- In the terminal, change directory to `user-feed-backend` folder
- Run `npm install`

## Running the Solution
### Configuring Sequelize
The contents of `user-feed-backend/config/config.json` file would be something like this:
```
{
	"development": {
		"username": "...",
		"password": "...",
		"database": "...",
		"host": "127.0.0.1",
		"dialect": "mysql"
	},
	"test": { ... },
	"production": { ... }
}
```
Since we would be running the server in development mode; in the `development` object, set the properties:
- `username` to the username of your MySQL instance
- `password` to the password of your MySQL instance
- `database` to the name of your database in the MySQL instance

>In the database, there is NO need to either create any new table or add entries to it, since Sequelize would take care of creating the table if it doesn't exists, on the first run of the Express server.

> However, if you already have a table named `stats` in your database even before you run this application, make sure you drop the table to prevent conflicts due to different table structure.

### Starting the Express Server
> Note: Express server must be run before running the React application

- Open a new terminal, and then change the directory to `user-feed-backend`.
- Run `npm run dev` to start the Express server.

### Starting the React Application
- Open another terminal, and then change the directory to `user-feed-frontend`.
- Run `npm start` to start the React application.
