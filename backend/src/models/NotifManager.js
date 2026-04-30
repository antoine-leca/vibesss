const AbstractManager = require("./AbstractManager");

class NotifManager extends AbstractManager {
    constructor() {
        super({ table: "notifs" });
    }

    insert(notif) {
        return this.database.query(`INSERT INTO ${this.table}(notif_type, comment_id, article_id, user_id) VALUES (?, ?, ?, ?)`, [
            notif.notif_type, 
            notif.comment_id || null,
            notif.article_id || null,
            notif.user_id
        ]);
    }

    markAsRead(id) {
        return this.database.query(
            `UPDATE ${this.table} SET read_date = NOW() WHERE id = ?`,
            [id]
        );
    }

    findUnreadByUser(userId) {
        return this.database.query(
            `SELECT * FROM ${this.table} WHERE user_id = ? AND read_date IS NULL`,
            [userId]
        );
    }

}

module.exports = NotifManager;