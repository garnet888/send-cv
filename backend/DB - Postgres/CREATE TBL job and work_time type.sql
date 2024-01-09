CREATE TABLE job_type (
	-- Хүний нөөц, мэдээллийн технологи г.м
	id		SERIAL PRIMARY KEY,
	type	VARCHAR
);

CREATE TABLE work_time_type (
	-- Full time, Part time e.t
	id		SERIAL PRIMARY KEY,
	type	VARCHAR
);