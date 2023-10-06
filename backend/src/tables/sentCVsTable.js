const pool = require("../databasePool");

class SentCVsTable {
  static getByUserJobID({ userID, jobID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM sent_cvs
          WHERE user_id = $1 AND job_id = $2`,
        [userID, jobID],
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

  static insert({ userID, jobID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO sent_cvs (user_id, job_id, sent_date)
          VALUES ($1, $2, NOW())`,
        [userID, jobID],
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

  static getAll() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM sent_cvs
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

  static getByUserID({ userID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM sent_cvs
          WHERE user_id = $1
          ORDER BY id DESC`,
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

  static getByJobID({ jobID }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM sent_cvs
          WHERE job_id = $1
          ORDER BY id DESC`,
        [jobID],
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
        `SELECT * FROM sent_cvs
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
        `DELETE FROM sent_cvs
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

module.exports = SentCVsTable;
