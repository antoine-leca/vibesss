  const argon2 = require("argon2");
  const jwt = require("jsonwebtoken");

  const hashingOptions = {
    type: argon2.argon2id,
    memoryCost: 2 ** 16,
    timeCost: 5,
    parallelism: 1,
  };

  const hashPassword = async (req, res, next) => {
    try {

    const hash = await argon2.hash(req.body.password, hashingOptions);

    req.body.hashedPassword = hash;
    delete req.body.password;

    next();
    
    } catch (err) {
    console.error(err);
    res.sendStatus(500);
    }

  };



  const verifyPassword = async (req, res) => {

  try {
  const isVerified = await argon2.verify(req.user.hashedPassword, req.body.plainPassword);
  
  if (isVerified) {
  const payload = {sub: req.user.id };

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "4h",
  });
  delete req.user.hashedPassword;
  res.send({token, user: req.user});

  } else {
    res.sendStatus(401);
  }
  }  catch (err) {
          console.error(err);
          res.sendStatus(500);
  }
  };




  module.exports = {
    hashPassword,
    verifyPassword,
  };