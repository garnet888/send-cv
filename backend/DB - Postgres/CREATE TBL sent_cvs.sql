CREATE TABLE sent_cvs (
	id			SERIAL PRIMARY KEY,
	user_id	 	INT,
	job_id		INT,
	sent_date	TIMESTAMP,
	
	FOREIGN KEY(user_id) 
  		REFERENCES users(id) ON DELETE CASCADE,

	FOREIGN KEY(job_id) 
  		REFERENCES jobs(id) ON DELETE CASCADE
);