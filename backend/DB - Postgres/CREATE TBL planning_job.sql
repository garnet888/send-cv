CREATE TABLE planning_job (
	id				SERIAL PRIMARY KEY,
	user_id			INT,
	min_salary		INT,
	max_salary 		INT,
	job_type_id 	INT, -- Хүний нөөц, мэдээллийн технологи г.м
	wk_time_type_id	INT, -- Full time, Part time e.t

	FOREIGN KEY(user_id) 
  		REFERENCES users(id) ON DELETE CASCADE,

	FOREIGN KEY(job_type_id) 
  		REFERENCES job_type(id),

	FOREIGN KEY(wk_time_type_id) 
  		REFERENCES work_time_type(id)
);