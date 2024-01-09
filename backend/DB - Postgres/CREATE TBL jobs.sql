CREATE TABLE jobs (
	id				SERIAL PRIMARY KEY,
	name	 		VARCHAR,
	job_type_id		INT,
	wk_time_type_id	INT,
	min_salary		INT,
	max_salary		INT,
	is_negotiable	BOOLEAN,
	duty			TEXT,
	requirement		TEXT,
	created_date	TIMESTAMP,
	updated_date	TIMESTAMP,
	
	FOREIGN KEY(job_type_id) 
  		REFERENCES job_type(id),

	FOREIGN KEY(wk_time_type_id) 
  		REFERENCES work_time_type(id)
);