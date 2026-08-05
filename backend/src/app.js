// ------------ IMPORTS MODULES & MIDDLEWARES
const fs = require("node:fs");
const path = require("node:path");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// ------------ CRÉATION DE L'APPLICATION EXPRESS
const app = express();

// 1. CORS TOUT EN HAUT (Obligatoire pour autoriser les cookies et le port 5173 du front)
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    optionsSuccessStatus: 200,
    credentials: true, // Permet d'envoyer et recevoir les cookies HttpOnly (JWT)
  })
);

// 2. PARSERS (Pour lire les requêtes JSON, les formulaires et les cookies)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// 3. CHARGEMENT DES ROUTES API
const router = require("./router");
app.use(router);

// 4. DOSSIER PUBLIC DES RESSOURCES STATIQUES BACKEND (Images, uploads, etc.)
app.use(express.static(path.join(__dirname, "../public")));

// 5. SERVIR L'APPLICATION REACT EN PRODUCTION (SI LE BUILD EXISTE)
const reactIndexFile = path.join(
  __dirname,
  "..",
  "..",
  "frontend",
  "dist",
  "index.html"
);

if (fs.existsSync(reactIndexFile)) {
  app.use(express.static(path.join(__dirname, "..", "..", "frontend", "dist")));

  app.get("*", (req, res) => {
    res.sendFile(reactIndexFile);
  });
}

module.exports = app;