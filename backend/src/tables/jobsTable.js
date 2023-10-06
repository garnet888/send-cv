const pool = require("../databasePool");

class JobsTable {
  static getJobTypes() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM job_type
          ORDER BY id ASC`,
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getWKTimeTypes() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM work_time_type
          ORDER BY id ASC`,
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT
            j.*,
            jt.type as job_type,
            tt.type as time_type
          FROM jobs j
          INNER JOIN job_type jt ON jt.id = j.job_type_id
          INNER JOIN work_time_type tt ON tt.id = j.wk_time_type_id
          ORDER BY id DESC`,
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getSorting({ searchValue, jobTypeID, timeTypeID, offset, limit }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT
            COUNT(j.*) OVER() AS total_count,
            j.*,
            jt.type as job_type,
            tt.type as time_type
          FROM jobs j
          INNER JOIN job_type jt ON jt.id = j.job_type_id
          INNER JOIN work_time_type tt ON tt.id = j.wk_time_type_id
          WHERE
            name ILIKE $1
            AND CAST(jt.id AS TEXT) ILIKE $2
            AND CAST(tt.id AS TEXT) ILIKE $3
          ORDER BY j.id DESC
          OFFSET $4 LIMIT $5`,
        [`%${searchValue}%`, `%${jobTypeID}`, `%${timeTypeID}`, offset, limit],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows);
          }
        }
      );
    });
  }

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT
            j.*,
            jt.type as job_type,
            tt.type as time_type
          FROM jobs j
          INNER JOIN job_type jt ON jt.id = j.job_type_id
          INNER JOIN work_time_type tt ON tt.id = j.wk_time_type_id
          WHERE j.id = $1`,
        [id],
        (error, response) => {
          if (error) {
            return reject(error);
          } else {
            resolve(response.rows[0]);
          }
        }
      );
    });
  }

  static insert({
    name,
    jobTypeID,
    wkTimeTypeID,
    minSalary,
    maxSalary,
    isNegotiable,
    duty,
    requirement,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO jobs (
            name,
            job_type_id,
            wk_time_type_id,
            min_salary,
            max_salary,
            is_negotiable,
            duty,
            requirement,
            created_date
          ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())`,
        [
          name,
          jobTypeID,
          wkTimeTypeID,
          minSalary,
          maxSalary,
          isNegotiable,
          duty,
          requirement,
        ],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static update({
    id,
    name,
    jobTypeID,
    wkTimeTypeID,
    minSalary,
    maxSalary,
    isNegotiable,
    duty,
    requirement,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE jobs SET
            name = $2,
            job_type_id = $3,
            wk_time_type_id = $4,
            min_salary = $5,
            max_salary = $6,
            is_negotiable = $7,
            duty = $8,
            requirement = $9,
            updated_date = NOW()
          WHERE id = $1`,
        [
          id,
          name,
          jobTypeID,
          wkTimeTypeID,
          minSalary,
          maxSalary,
          isNegotiable,
          duty,
          requirement,
        ],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }

  static delete({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM jobs
          WHERE id = $1`,
        [id],
        (error) => {
          if (error) {
            return reject(error);
          } else {
            resolve({ message: "success" });
          }
        }
      );
    });
  }
}

module.exports = JobsTable;
