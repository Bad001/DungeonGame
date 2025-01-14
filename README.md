# DungeonGame
Progetto per esame Programmazione Web e Mobile con laboratorio UNIPG
# Prepare users table in MySQL
CREATE TABLE users (
	email varchar(255),
	nickname varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	PRIMARY KEY (email)
);
# Install Node Packages for backend and frontend
npm install
# Setting Up the Environment
Create a simple plain text file denominated .env
DB_HOST='your-db-host'
DB_USER='your-db-user'
DB_PASSWORD='your-db-password'
DB_NAME='your-db-name'
PORT=3000

JWT_SECRET='your-secret-jwt'