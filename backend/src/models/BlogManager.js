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

    findAll() {
        return this.database.query(
            `SELECT 
                b.id, b.title, b.description, b.creation_date, b.theme_id, b.user_id, b.banniere, b.couleurs,
                u.pseudo, u.profile_picture,
                t.bg_image, t.label AS theme_label, t.color_name AS theme_color, t.font_name AS theme_font
             FROM ${this.table} b
             INNER JOIN users u ON b.user_id = u.id
             INNER JOIN themes t ON b.theme_id = t.id`
        );
    }

    find(id) {
        return this.database.query(
            `SELECT 
                b.id, b.title, b.description, b.creation_date, b.theme_id, b.user_id, b.banniere, b.couleurs,
                u.pseudo, u.profile_picture,
                t.bg_image, t.label AS theme_label, t.color_name AS theme_color, t.font_name AS theme_font
             FROM ${this.table} b
             INNER JOIN users u ON b.user_id = u.id
             INNER JOIN themes t ON b.theme_id = t.id
             WHERE b.id = ?`,
            [id]
        );
    }

    findByUserId(userId) {
        return this.database.query(
            `SELECT 
                b.id, b.title, b.description, b.creation_date, b.theme_id, b.user_id, b.banniere, b.couleurs,
                u.pseudo, u.profile_picture,
                t.bg_image, t.label AS theme_label, t.color_name AS theme_color, t.font_name AS theme_font
             FROM ${this.table} b
             INNER JOIN users u ON b.user_id = u.id
             INNER JOIN themes t ON b.theme_id = t.id
             WHERE b.user_id = ?`,
            [userId]
        );
    }
}

module.exports = BlogManager;
