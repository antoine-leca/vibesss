require("dotenv").config(); // Charge les variables d'environnement depuis le fichier .env

const app = require("./src/app");

// Récupère le port depuis process.env.APP_PORT ou utilise 5001 par défaut
const port = parseInt(process.env.APP_PORT ?? "5001", 10);

app.listen(port, (err) => {
  if (err) {
    console.error("Erreur lors du démarrage du serveur :", err);
  } else {
    console.log(`🚀 Serveur backend à l'écoute sur http://localhost:${port}`);
  }
});