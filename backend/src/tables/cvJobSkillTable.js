const pool = require("../databasePool");

class CVJobSkillTable {
  static insert({ userID, skill, level }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO cv_job_skill (
            user_id,
            skill,
            level
          ) VALUES ($1, $2, $3)`,
        [userID, skill, level],
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

  static update({ id, skill, level }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE cv_job_skill SET
            skill = $2,
            level = $3
          WHERE id = $1`,
        [id, skill, level],
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
        `SELECT * FROM cv_job_skill
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

  static getByID({ id }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM cv_job_skill
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
        `DELETE FROM cv_job_skill
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

module.exports = CVJobSkillTable;
