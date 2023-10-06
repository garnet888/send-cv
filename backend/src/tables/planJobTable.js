const pool = require("../databasePool");

class PlanJobTable {
  static getByUserID({ userID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT
            p.*,
            jt.type as job_type,
            tt.type as time_type
          FROM planning_job p
          INNER JOIN job_type jt ON jt.id = p.job_type_id
          INNER JOIN work_time_type tt ON tt.id = p.wk_time_type_id
          WHERE user_id = $1`,
        [userID],
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

  static insert({ userID, minSalary, maxSalary, jobTypeID, wkTimeTypeID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO planning_job (
            user_id,
            min_salary,
            max_salary,
            job_type_id,
            wk_time_type_id
          ) VALUES ($1, $2, $3, $4, $5)`,
        [userID, minSalary, maxSalary, jobTypeID, wkTimeTypeID],
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

  static update({ id, userID, minSalary, maxSalary, jobTypeID, wkTimeTypeID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE planning_job SET
            user_id = $2,
            min_salary = $3,
            max_salary = $4,
            job_type_id = $5,
            wk_time_type_id = $6
          WHERE id = $1`,
        [id, userID, minSalary, maxSalary, jobTypeID, wkTimeTypeID],
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

module.exports = PlanJobTable;
