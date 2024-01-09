CREATE TABLE cv_job_skill (
	id		SERIAL PRIMARY KEY,
	user_id	INT,
	skill	VARCHAR,
	level	INT,
	
	FOREIGN KEY(user_id) 
  		REFERENCES users(id) ON DELETE CASCADE
);