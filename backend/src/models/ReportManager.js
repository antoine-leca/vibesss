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
            `UPDATE ${this.table} SET report_reason = ?, description = ? WHERE id = ?`,
            [report.report_reason, report.description, report.id]
        );
    }

}

module.exports = ReportManager;