const pool = require("../databasePool");

class CVJobHisTable {
  static insert({
    userID,
    companyName,
    jobTypeID,
    position,
    salary,
    enterDate,
    leaveDate,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO cv_job_history (
            user_id,
            company_name,
            job_type_id,
            job_position,
            salary,
            enter_date,
            leave_date
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          userID,
          companyName,
          jobTypeID,
          position,
          salary,
          enterDate,
          leaveDate,
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
    companyName,
    jobTypeID,
    position,
    salary,
    enterDate,
    leaveDate,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE cv_job_history SET
            company_name = $2,
            job_type_id = $3,
            job_position = $4,
            salary = $5,
            enter_date = $6,
            leave_date = $7
          WHERE id = $1`,
        [id, companyName, jobTypeID, position, salary, enterDate, leaveDate],
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

  static getByUserID({ userID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT
            h.*,
            jt.type as job_type
          FROM cv_job_history h
          INNER JOIN job_type jt ON jt.id = h.job_type_id
          WHERE user_id = $1
          ORDER BY h.leave_date DESC`,
        [userID],
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
        `SELECT * FROM cv_job_history
          WHERE id = $1`,
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

  static delete({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `DELETE FROM cv_job_history
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

module.exports = CVJobHisTable;
