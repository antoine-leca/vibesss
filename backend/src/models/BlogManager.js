const AbstractManager = require("./AbstractManager");

class BlogManager extends AbstractManager {
    constructor() {
        super({ table: "blogs" });
    }

    insert(blog) {
        return this.database.query(
            `INSERT INTO ${this.table} (user_id, theme_id, title, description, creation_date) VALUES (?, ?, ?, ?)`,
            [
                blog.user_id,
                blog.theme_id,
                blog.title,
                blog.description,
                blog.creation_date
            ]
        );
    }

    update(blog) {
        return this.database.query(
            `UPDATE ${this.table} SET theme_id = ?, title = ?, description = ? WHERE id = ?`, 
            [
                blog.theme_id,
                blog.title,
                blog.description,
                blog.id
            ]
        );
    }
}


module.exports = BlogManager;
