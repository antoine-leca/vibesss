const AbstractManager = require("./AbstractManager");

class UserReportManager extends AbstractManager {
  constructor() {
    super({ table: "users_reports" });
  }

  insert(report) {
    return this.database.query(
      `INSERT INTO ${this.table} (user_id, article_id, blog_id, comment_id, report_id) VALUES (?, ?, ?, ?, ?)`,
      [
        report.user_id,
        report.article_id,
        report.blog_id,
        report.comment_id,
        report.report_id
      ]
    );
  }

 deleteSpecific(userId, reportId) {
  return this.database.query(
    `DELETE FROM ${this.table} WHERE user_id = ? AND report_id = ?`,
    [userId, reportId]
  );
}

findSpecific(userId, reportId){
  return this.database.query(
    `SELECT * FROM ${this.table} WHERE user_id = ? AND report_id = ?`, 
    [userId, reportId]
  );
}
}

module.exports = UserReportManager;