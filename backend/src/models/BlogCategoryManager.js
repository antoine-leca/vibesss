const AbstractManager = require("./AbstractManager");

class BlogCategoryManager extends AbstractManager {
  constructor() {
    super({ table: "blogs_categories" });
  }

  insert(blogCategory) {
    return this.database.query(
      `INSERT INTO ${this.table} (blog_id, categorie_id) VALUES (?, ?)`,
      [blogCategory.blog_id, blogCategory.categorie_id]
    );
  }

  findByBlogId(blogId) {
    return this.database.query(
      `SELECT categorie_id FROM ${this.table} WHERE blog_id = ?`,
      [blogId]
    );
  }

  findByCategoryId(categoryId) {
    return this.database.query(
      `SELECT blog_id FROM ${this.table} WHERE categorie_id = ?`,
      [categoryId]
    );
  }

  deleteByBlogAndCategory(blogId, categoryId) {
    return this.database.query(
      `DELETE FROM ${this.table} WHERE blog_id = ? AND categorie_id = ?`,
      [blogId, categoryId]
    );
  }
}

module.exports = BlogCategoryManager;