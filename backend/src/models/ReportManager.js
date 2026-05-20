const AbstractManager = require("./AbstractManager");

class ReportManager extends AbstractManager {
    constructor() {
        super({ table: "reports" });
    }

    insert(report) {
        return this.database.query(
            `INSERT INTO ${this.table}(report_reason, description) VALUES (?, ?)`,
            [report.report_reason, report.description]
        );
        //ici pas besoin de report_date grâce à CUURENT_TIMESTAMP dans notre BDD
    }

    update(report) {
        return this.database.query(
            `UPDATE ${this.table} SET status = ? WHERE id = ?`,
            [report.status, report.id]
        );
    }

    findAllWithDetails() {
        return this.database.query(
            `SELECT 
                r.id, r.report_reason, r.description, r.status, r.report_date,
                u.firstname as reporter_name,
                a.title as article_title,
                b.title as blog_title,
                c.content as comment_text
            FROM reports r
            INNER JOIN users_reports ur ON r.id = ur.report_id
            INNER JOIN users u ON ur.user_id = u.id
            LEFT JOIN articles a ON ur.article_id = a.id
            LEFT JOIN blogs b ON ur.blog_id = b.id
            LEFT JOIN comments c ON ur.comment_id = c.id
            ORDER BY r.report_date DESC`
        );
    }

}

module.exports = ReportManager;