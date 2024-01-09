CREATE TABLE cv_education (
	id				SERIAL PRIMARY KEY,
	user_id			INT,
	level_id		INT,
	school_name		VARCHAR,
	occupation		VARCHAR,
	enter_year		INT,
	end_year		INT,
	GPA				FLOAT,

	FOREIGN KEY(user_id) 
  		REFERENCES users(id) ON DELETE CASCADE,

	FOREIGN KEY(level_id) 
  		REFERENCES cv_edu_level(id)
);