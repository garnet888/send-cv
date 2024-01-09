CREATE TABLE cv_job_history (
	id				SERIAL PRIMARY KEY,
	user_id			INT,
	company_name	VARCHAR,
	job_type_id 	INT, -- Хүний нөөц, мэдээллийн технологи г.м
	job_position	VARCHAR,
	salary 			INT,
	enter_date		VARCHAR,
	leave_date		VARCHAR,

	FOREIGN KEY(user_id) 
  		REFERENCES users(id) ON DELETE CASCADE,

	FOREIGN KEY(job_type_id) 
  		REFERENCES job_type(id)
);