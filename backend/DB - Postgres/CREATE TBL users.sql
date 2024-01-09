CREATE TABLE users (
	id			SERIAL PRIMARY KEY,
	photo		VARCHAR,
	firstname 	VARCHAR,
	lastname 	VARCHAR,
	register	VARCHAR,
	gender		VARCHAR,
	birth_date  TIMESTAMP,
	phonenumber	INT,
	address		VARCHAR,
	email		VARCHAR UNIQUE,
	password	VARCHAR
);