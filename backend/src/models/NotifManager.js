const AbstractManager = require("./AbstractManager");

class NotifManager extends AbstractManager {
    constructor() {
        super({ table: "notifs" });
    }

    insert(notif) {
        return this.database.query(
            `INSERT INTO ${this.table}(notif_type, comment_id, article_id, user_id, sender_id) VALUES (?, ?, ?, ?, ?)`, 
            [
                notif.notif_type, 
                notif.comment_id || null,
                notif.article_id || null,
                notif.user_id,
                notif.sender_id // <--- Nouveau
            ]
        );
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

    findByUserWithDetails(userId) {
        return this.database.query(
            `SELECT n.*, u.pseudo as sender_pseudo, a.title as article_title 
             FROM ${this.table} n
             JOIN users u ON n.sender_id = u.id
             JOIN articles a ON n.article_id = a.id
             WHERE n.user_id = ? 
             ORDER BY n.id DESC LIMIT 10`, 
            [userId]
        );
    }

}

module.exports = NotifManager;