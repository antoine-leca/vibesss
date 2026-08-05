const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

// ---------------------------------------------------------------------
// 1. HACHAGE DU MOT DE PASSE (Méthode Argon2id)
// ---------------------------------------------------------------------
const hashPassword = async (req, res, next) => {
  try {
    if (!req.body.password) {
      return res.status(400).send("Le mot de passe est obligatoire");
    }

    const hashedPassword = await argon2.hash(req.body.password, hashingOptions);
    req.body.hashedPassword = hashedPassword;
    delete req.body.password;
    
    next();
  } catch (err) {
    console.error("Erreur lors du hachage du mot de passe :", err);
    res.sendStatus(500);
  }
};

// ---------------------------------------------------------------------
// 2. VÉRIFICATION DU MOT DE PASSE ET GÉNÉRATION DU JWT (Authentification)
// ---------------------------------------------------------------------
const verifyPassword = async (req, res) => {
  try {
    const isVerified = await argon2.verify(req.user.password, req.body.password);

    if (isVerified) {
      // Ingestion directe de role_id et role (libellé) dans le payload JWT (RBAC Stateless)
      const payload = { 
        sub: req.user.id,
        role_id: req.user.role_id,
        role: req.user.role_name || req.user.role
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "4h",
      });

      // Retrait des données sensibles avant d'envoyer la réponse
      delete req.user.password;
      delete req.user.hashedPassword;

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 4 * 60 * 60 * 1000
      });

      res.json({ user: req.user });
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de l'authentification :", err);
    res.sendStatus(500);
  }
};

// ---------------------------------------------------------------------
// 3. MIDDLEWARE : VÉRIFICATION DU TOKEN JWT (Authentification requise)
// ---------------------------------------------------------------------
const verifyToken = (req, res, next) => {
  try {
    let token = req.cookies ? req.cookies.token : null;

    if (!token) {
      const authorizationHeader = req.get("Authorization");

      if (authorizationHeader == null) {
        throw new Error("Authorization header or cookie token is missing");
      }

      const [type, tokenFromHeader] = authorizationHeader.split(" ");

      if (type !== "Bearer") {
        throw new Error("Authorization header has not the 'Bearer' type");
      }
      token = tokenFromHeader;
    }

    // Décodage et vérification de la signature du token
    req.payload = jwt.verify(token, process.env.JWT_SECRET);

    next();
  } catch (err) {
    console.error("Token non valide :", err);
    res.sendStatus(401);
  }
};

// ---------------------------------------------------------------------
// 4. MIDDLEWARE : VÉRIFICATION DU RÔLE ADMINISTRATEUR (RBAC - Contrôle d'accès)
// ---------------------------------------------------------------------
const verifyAdmin = (req, res, next) => {
  // verifyToken doit impérativement être exécuté au préalable pour alimenter req.payload
  if (req.payload && req.payload.role_id === 2) {
    next();
  } else {
    res.status(403).send("Accès refusé : privilèges administrateur requis");
  }
};

// ---------------------------------------------------------------------
// 5. DÉCONNEXION (Suppression du Cookie HttpOnly)
// ---------------------------------------------------------------------
const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  }).sendStatus(200);
};

module.exports = {
  hashPassword,
  verifyPassword,
  verifyToken,
  verifyAdmin,
  logout
};