# Dungeon Game
Progetto per esame Programmazione Web e Mobile con laboratorio UNIPG
## Prepare users table in your MySQL DBMS
~~~~sql
CREATE TABLE users (
	email varchar(255),
	nickname varchar(255) NOT NULL UNIQUE,
	password varchar(255) NOT NULL,
	PRIMARY KEY (email)
);
~~~~
## Install Node Packages for backend (NodeJS) and frontend (Angular)
```bash
npm install
```
> [!IMPORTANT]
> NodeJS Web Server folder for Backend and DungeonGame folder for Frontend
## Setting Up the Environment
Create a simple plain text file denominated .env
```bash
DB_HOST='your-db-host'
DB_USER='your-db-user'
DB_PASSWORD='your-db-password'
DB_NAME='your-db-name'
PORT=3000

JWT_SECRET='your-secret-jwt'
```
## Usage
On the 'NodeJS Web Server' folder
```bash
npm start
```
## Contributing
Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Credits
The assets and the idea of the mechanic's game came from [Little Rocket Games](https://www.littlerocketgames.com/product/one-card-dungeon/).
> [!WARNING]
> I'm not the creator of the game and I don't assume any responsibility about the use or deploy of this Software that I've Wrote.