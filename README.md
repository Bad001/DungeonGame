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
Create a simple plain text file denominated .env on NodeJS Web Server folder
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

## Credits
The assets and ideas of the game mechanics come from [Little Rocket Games](https://www.littlerocketgames.com/product/one-card-dungeon/).
> [!WARNING]
> I'm not the creator of the game and I don't assume any responsibility about the improper use or deploy of this Software that I've Wrote.

## License

The source code in this repository is released under the MIT License (see LICENSE).

**This does not cover the game assets.** Artwork and game mechanics are the property of
Little Rocket Games (One Card Dungeon) and are included here for educational purposes
only, as part of a university coursework project. They are not licensed for reuse or
redistribution. Remove or replace them before using this code in any other context.
