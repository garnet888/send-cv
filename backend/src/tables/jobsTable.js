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
}

module.exports = JobsTable;
