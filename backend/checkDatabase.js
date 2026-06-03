require("dotenv").config();

const mysql = require("mysql2/promise");

const testConnection = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log(" Connecté à la base de données");

    // Vérifier les utilisateurs
    const [users] = await connection.execute("SELECT id, pseudo, email FROM users LIMIT 5");
    console.log(" Utilisateurs:");
    if (users.length === 0) {
      console.log(" Aucun utilisateur trouvé!");
    } else {
      console.table(users);
    }

    // Vérifier les articles
    const [articles] = await connection.execute("SELECT id, title, user_id, blog_id FROM articles LIMIT 5");
    console.log(" Articles:");
    if (articles.length === 0) {
      console.log(" Aucun article trouvé!");
    } else {
      console.table(articles);
    }

    // Vérifier les blogs
    const [blogs] = await connection.execute("SELECT id, title, user_id FROM blogs LIMIT 5");
    console.log("Blogs:");
    if (blogs.length === 0) {
      console.log(" Aucun blog trouvé!");
    } else {
      console.table(blogs);
    }

    // Vérifier les commentaires
    const [comments] = await connection.execute("SELECT id, content, article_id, user_id FROM comments LIMIT 5");
    console.log(" Commentaires:");
    if (comments.length === 0) {
      console.log(" Aucun commentaire trouvé!");
    } else {
      console.table(comments);
    }

    await connection.end();
  } catch (error) {
    console.error(" Erreur:", error.message);
    process.exit(1);
  }
};

testConnection();
