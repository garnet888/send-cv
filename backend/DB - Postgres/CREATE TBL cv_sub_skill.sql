CREATE TABLE cv_sub_skill (
	id		SERIAL PRIMARY KEY,
	user_id	INT,
	skill	VARCHAR,	

	FOREIGN KEY(user_id) 
  		REFERENCES users(id) ON DELETE CASCADE
);