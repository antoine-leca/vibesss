const AbstractManager = require("./AbstractManager");

class BlogManager extends AbstractManager {
    constructor() {
        super({ table: "blogs" });
    }

    insert(blog) {
        return this.database.query(
            `INSERT INTO ${this.table} (title, description, user_id, theme_id, banniere, couleurs) VALUES (?,?,?,?,?,?)`,
            [blog.title, blog.description, blog.user_id, blog.theme_id || 1, blog.banniere, blog.couleurs]
        );
    }

    update(blog) {
        return this.database.query(
            `UPDATE ${this.table} SET title = ?, description = ?, theme_id = ?, banniere = ?, couleurs = ? WHERE id = ?`,
            [blog.title, blog.description, blog.theme_id, blog.banniere, blog.couleurs, blog.id]
        );
    }

    findByUserId(userId) {
        return this.database.query(`SELECT * FROM ${this.table} WHERE user_id = ?`, [userId]);
    }
}

module.exports = BlogManager;
