const pool = require("../databasePool");

class CVSubSkillTable {
  static insert({ userID, skill }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO cv_sub_skill (
            user_id,
            skill
          ) VALUES ($1, $2)`,
        [userID, skill],
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

  static update({ id, skill }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE cv_sub_skill SET
            skill = $2
          WHERE id = $1`,
        [id, skill],
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
        `SELECT * FROM cv_sub_skill
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
        `SELECT * FROM cv_sub_skill
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
        `DELETE FROM cv_sub_skill
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

module.exports = CVSubSkillTable;
