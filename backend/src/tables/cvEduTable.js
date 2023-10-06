const pool = require("../databasePool");

class CVEduTable {
  static getLevels() {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT * FROM cv_edu_level
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

  static insert({
    userID,
    levelID,
    schoolName,
    occupation,
    enterYear,
    endYear,
    gpa,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `INSERT INTO cv_education (
            user_id,
            level_id,
            school_name,
            occupation,
            enter_year,
            end_year,
            gpa
          ) VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [userID, levelID, schoolName, occupation, enterYear, endYear, gpa],
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
    levelID,
    schoolName,
    occupation,
    enterYear,
    endYear,
    gpa,
  }) {
    return new Promise((resolve, reject) => {
      pool.query(
        `UPDATE cv_education SET
            level_id = $2,
            school_name = $3,
            occupation = $4,
            enter_year = $5,
            end_year = $6,
            gpa = $7
          WHERE id = $1`,
        [id, levelID, schoolName, occupation, enterYear, endYear, gpa],
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
            e.*,
            el.level
          FROM cv_education e
          INNER JOIN cv_edu_level el ON el.id = e.level_id
          WHERE user_id = $1
          ORDER BY e.end_year DESC`,
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
        `SELECT * FROM cv_education
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
        `DELETE FROM cv_education
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

module.exports = CVEduTable;
