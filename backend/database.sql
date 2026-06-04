SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS users_reports;
DROP TABLE IF EXISTS users_blogs;
DROP TABLE IF EXISTS users_articles;
DROP TABLE IF EXISTS users_roles;
DROP TABLE IF EXISTS blogs_categories;
DROP TABLE IF EXISTS notifs;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS articles;
DROP TABLE IF EXISTS blogs;
DROP TABLE IF EXISTS themes;
DROP TABLE IF EXISTS reports;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS=1;

CREATE TABLE users (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  lastname VARCHAR(150) NULL,
  firstname VARCHAR(150) NULL,
  pseudo VARCHAR(100) NOT NULL UNIQUE,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  bio VARCHAR(500) NULL,
  profile_picture VARCHAR(255) NULL,
  status ENUM('active','inactive') DEFAULT 'active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE roles (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(50) NOT NULL
);

CREATE TABLE categories (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL
);

CREATE TABLE themes (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(100) NOT NULL,
  color_name VARCHAR(50) NOT NULL,
  font_name VARCHAR(100) NOT NULL,
  bg_image VARCHAR(255) NOT NULL
);

CREATE TABLE reports (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  report_reason ENUM('spam','bully','inappropriate','copyright'),
  description VARCHAR(255) NOT NULL,
  status ENUM('active', 'inactive') DEFAULT 'active',
  report_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE blogs (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  description VARCHAR(255) NOT NULL,
  creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  theme_id INT(11) UNSIGNED NOT NULL,
  user_id INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY (theme_id) REFERENCES themes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE articles (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  content_text LONGTEXT NULL,
  content_image VARCHAR(255) NULL,
  release_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  creation_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  status ENUM('published','draft') NULL,
  blog_id INT(11) UNSIGNED NOT NULL,
  user_id INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE comments (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  content VARCHAR(200) NOT NULL,
  comment_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  moderation_status ENUM('pending','approved','reported','rejected') NULL,
  article_id INT(11) UNSIGNED NOT NULL,
  user_id INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE notifs (
  id INT(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  read_date DATETIME NULL,
  notif_type ENUM('comment','like') NOT NULL,
  comment_id INT(11) UNSIGNED NULL,
  article_id INT(11) UNSIGNED NULL,
  user_id INT(11) UNSIGNED NOT NULL,
  sender_id INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE blogs_categories (
  blog_id INT(11) UNSIGNED NOT NULL,
  categorie_id INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (blog_id, categorie_id),
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (categorie_id) REFERENCES categories(id) ON DELETE CASCADE
);

CREATE TABLE users_roles (
  user_id INT(11) UNSIGNED NOT NULL,
  role_id INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (user_id, role_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

CREATE TABLE users_articles (
  user_id INT(11) UNSIGNED NOT NULL,
  article_id INT(11) UNSIGNED NOT NULL,
  PRIMARY KEY (user_id, article_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE TABLE users_reports (
  user_id INT(11) UNSIGNED NOT NULL,
  article_id INT(11) UNSIGNED NULL,
  blog_id INT(11) UNSIGNED NULL,
  comment_id INT(11) UNSIGNED NULL,
  report_id INT(11) UNSIGNED NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
  FOREIGN KEY (comment_id) REFERENCES comments(id) ON DELETE CASCADE,
  FOREIGN KEY (report_id) REFERENCES reports(id) ON DELETE CASCADE
);


ALTER TABLE blogs 
ADD COLUMN banniere LONGTEXT NULL AFTER theme_id,
ADD COLUMN couleurs LONGTEXT NULL AFTER banniere;


INSERT INTO themes (label, color_name, font_name, bg_image) VALUES 
('Cuisine', 'orange', 'Playfair Display', 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=800&q=80'),
('Animaux', 'brown', 'Arial', 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80'),
('Lifestyle', 'pastel-pink', 'Montserrat', 'https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=800&q=80'),
('Sport', 'red', 'Impact', 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80'),
('Nature', 'green', 'Helvetica', 'https://images.unsplash.com/photo-1472214222541-d510753a4907?w=800&q=80'),
('Voyage', 'blue', 'Roboto', 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80');



-- Seed initial data
INSERT INTO roles (id, label) VALUES (1, 'user'), (2, 'admin');



-- =====================================================================
-- 1. INSÉRTION DES 17 UTILISATEURS (1 Admin [id: 1] + 16 Users [id: 2 à 17])
-- =====================================================================
INSERT INTO users (id, firstname, lastname, pseudo, email, password, bio, profile_picture, status) VALUES
(1, 'Véronique', 'Admin', 'veronique_admin', 'admin@vibesss.com', '$2b$10$FakeHashForPassword123', 'Administratrice de la plateforme Vibesss.', 'https://i.pravatar.cc/150?img=32', 'active'),
(2, 'Lisa', 'Dev', 'lisa_dev', 'lisa@vibesss.com', '$2b$10$FakeHashForPassword123', 'Apprentie développeuse passionnée de React.', 'https://i.pravatar.cc/150?img=47', 'active'),
(3, 'Thomas', 'Bernard', 'thomas_b', 'thomas@vibesss.com', '$2b$10$FakeHashForPassword123', 'Aime le café et le code propre.', 'https://i.pravatar.cc/150?img=33', 'active'),
(4, 'Julie', 'Wagner', 'julie_w', 'julie@vibesss.com', '$2b$10$FakeHashForPassword123', 'Cuisine, partage et bonne humeur.', 'https://i.pravatar.cc/150?img=44', 'active'),
(5, 'Maxime', 'Rousseau', 'maxime_rc', 'maxime@vibesss.com', '$2b$10$FakeHashForPassword123', 'Photographe amateur à mes heures perdues.', 'https://i.pravatar.cc/150?img=12', 'active'),
(6, 'Emma', 'Petit', 'emma_p', 'emma@vibesss.com', '$2b$10$FakeHashForPassword123', 'En route vers le mode de vie zéro déchet !', 'https://i.pravatar.cc/150?img=18', 'active'),
(7, 'Lucas', 'Moreau', 'lucas_m', 'lucas@vibesss.com', '$2b$10$FakeHashForPassword123', 'Fan d automobile et de nouvelles technologies.', 'https://i.pravatar.cc/150?img=53', 'active'),
(8, 'Chloé', 'Dubois', 'chloe_d', 'chloe@vibesss.com', '$2b$10$FakeHashForPassword123', 'Toujours à l affût des tendances mode.', 'https://i.pravatar.cc/150?img=61', 'active'),
(9, 'Nathan', 'Girard', 'nathan_g', 'nathan@vibesss.com', '$2b$10$FakeHashForPassword123', 'La vie est meilleure en musique.', 'https://i.pravatar.cc/150?img=54', 'active'),
(10, 'Inès', 'Laurent', 'ines_l', 'ines@vibesss.com', '$2b$10$FakeHashForPassword123', 'Globe-trotteuse compulsive.', 'https://i.pravatar.cc/150?img=28', 'active'),
(11, 'Hugo', 'Fontaine', 'hugo_f', 'hugo@vibesss.com', '$2b$10$FakeHashForPassword123', 'Le sport comme hygiène de vie.', 'https://i.pravatar.cc/150?img=56', 'active'),
(12, 'Sarah', 'Klein', 'sarah_k', 'sarah@vibesss.com', '$2b$10$FakeHashForPassword123', 'Dévoreuse de thrillers et de romans.', 'https://i.pravatar.cc/150?img=43', 'active'),
(13, 'Enzo', 'Valentin', 'enzo_v', 'enzo@vibesss.com', '$2b$10$FakeHashForPassword123', 'Docker et Node font bon ménage.', 'https://i.pravatar.cc/150?img=59', 'active'),
(14, 'Camille', 'Roux', 'camille_r', 'camille@vibesss.com', '$2b$10$FakeHashForPassword123', 'Artiste peintre et amoureuse de Paris.', 'https://i.pravatar.cc/150?img=49', 'active'),
(15, 'Arthur', 'Thomas', 'arthur_t', 'arthur@vibesss.com', '$2b$10$FakeHashForPassword123', 'Gamer passionné de RPG.', 'https://i.pravatar.cc/150?img=15', 'active'),
(16, 'Manon', 'Brunet', 'manon_b', 'manon@vibesss.com', '$2b$10$FakeHashForPassword123', 'Mindset positif et méditation.', 'https://i.pravatar.cc/150?img=26', 'active'),
(17, 'Léo', 'Simon', 'leo_s', 'leo@vibesss.com', '$2b$10$FakeHashForPassword123', 'Vivre mieux avec moins d objets.', 'https://i.pravatar.cc/150?img=60', 'active');


-- =====================================================================
-- 2. ASSOCIATIONS ROLES (User 1 = Admin / Users 2 à 17 = User)
-- =====================================================================
INSERT INTO users_roles (user_id, role_id) VALUES
(1, 2), -- Admin
(2, 1), (3, 1), (4, 1), (5, 1), (6, 1), (7, 1), (8, 1), (9, 1),
(10, 1), (11, 1), (12, 1), (13, 1), (14, 1), (15, 1), (16, 1), (17, 1);


-- =====================================================================
-- 3. INSÉRTION DES 16 BLOGS (Un par utilisateur standard, liés à différents thèmes)
-- =====================================================================
INSERT INTO blogs (id, title, description, theme_id, user_id) VALUES
(1, 'Le Blog Tech de Lisa', 'Mes aventures dans le monde du développement web et de React.', 3, 2),
(2, 'Les Carnets de Thomas', 'Partage d expériences quotidiennes d un passionné de tech.', 3, 3),
(3, 'Julie Kitchen & Co', 'Mes meilleures recettes gourmandes simples à réaliser.', 1, 4),
(4, 'Maxime Photo Portfolio', 'Focus, lumière et compositions urbaines au jour le jour.', 6, 5),
(5, 'Emma Green Life', 'Astuces quotidiennes et partages pour un mode de vie plus vert.', 5, 6),
(6, 'Lucas Auto Moto', 'Analyses et avis neutres sur l actualité mécanique.', 4, 7),
(7, 'Chloé Mode & Design', 'Inspirations vestimentaires et designs tendances du moment.', 3, 8),
(8, 'Nathan Music Vibes', 'Chroniques musicales et pépites sonores à découvrir.', 3, 9),
(9, 'Les Voyages d Inès', 'Récits de voyages et conseils pratiques autour du globe.', 6, 10),
(10, 'Hugo Sport & Fitness', 'Programmes d entraînement, nutrition et motivation.', 4, 11),
(11, 'Sarah Book Club', 'Fiches de lectures et avis sincères sur mes romans favoris.', 2, 12),
(12, 'Enzo Code & Coffee', 'Discussions techniques autour des architectures backend.', 3, 13),
(13, 'Camille Art Studio', 'Coulisses de mes créations artistiques et actus expo.', 2, 14),
(14, 'Arthur Gaming Zone', 'Mes sessions de jeux, critiques de RPG et actus gaming.', 4, 15),
(15, 'Manon Mindset', 'Prendre soin de son esprit avec la gestion du stress quotidienne.', 5, 16),
(16, 'Léo Minimalisme', 'Guide d introduction pratique pour désencombrer sa vie.', 5, 17);


-- =====================================================================
-- 4. INSÉRTION DES ARTICLES (1 par blog, écrit par le propriétaire du blog)
-- =====================================================================
INSERT INTO articles (id, title, content_text, content_image, status, blog_id, user_id) VALUES
(1, 'Débuter avec React en 2026', 'React continue d évoluer. Aujourd hui nous allons voir comment bien structurer ses contextes globaux pour les hooks personnalisés...', 'react.jpg', 'published', 1, 2),
(2, 'Ma routine matinale productive', 'Se lever tôt ne suffit pas, il faut un plan clair. Voici les 3 habitudes que j ai mises en place pour attaquer ma journée...', 'morning.jpg', 'published', 2, 3),
(3, 'Recette secrète du fondant au chocolat', 'Le secret réside uniquement dans la qualité du chocolat et le temps de cuisson précis à la minute près. Suivez le guide...', 'choc.jpg', 'published', 3, 4),
(4, 'Capturer la lumière en ville', 'La photographie urbaine demande de la patience, surtout pendant l heure bleue où les contrastes deviennent magiques...', 'photo.jpg', 'published', 4, 5),
(5, 'Zéro déchet : par où commencer ?', 'Ne changez pas tout d un coup. Commencez par remplacer vos bouteilles en plastique par une gourde et achetez en vrac...', 'green.jpg', 'published', 5, 6),
(6, 'Test de la dernière sportive électrique', 'Une accélération foudroyante mais qu en est-il du retour d information dans le volant ? Après une semaine de test, voici mon avis...', 'car.jpg', 'published', 6, 7),
(7, 'Les tendances mode de cet été', 'Les couleurs pastel font un retour remarqué. On mise tout sur le confort et les matières légères et respirantes...', 'mode.jpg', 'published', 7, 8),
(8, 'Top 10 des albums de l année', 'De l électro underground au retour du rock indépendant, l année a été riche en émotions musicales. Voici ma sélection...', 'music.jpg', 'published', 8, 9),
(9, 'Mon road trip en Islande', 'Dix jours de pure liberté sur la route 1, entre geysers glaciaires, cascades vertigineuses et paysages volcaniques...', 'iceland.jpg', 'published', 9, 10),
(10, 'Programme de musculation split 4 jours', 'Idéal pour progresser sans y passer votre vie. Jour 1 : Pectoraux/Biceps, Jour 2 : Jambes, Jour 3 : Repos...', 'fitness.jpg', 'published', 10, 11),
(11, 'Pourquoi vous devez lire ce thriller', 'Un huis clos oppressant qui vous tient en haleine jusqu à la toute dernière page. L auteur maîtrise son suspense...', 'book.jpg', 'published', 11, 12),
(12, 'Pourquoi j aime Docker et Express', 'Conteneuriser une API Node.js/Express permet de s affranchir totalement des problèmes d environnement entre devs...', 'docker.jpg', 'published', 12, 13),
(13, 'Exposition aquarelle à Paris', 'Retrouvez-moi ce week-end dans la galerie du Marais pour découvrir mes douze dernières toiles axées sur les reflets...', 'art.jpg', 'published', 13, 14),
(14, 'Mon avis sur le dernier RPG', 'Une direction artistique sublime mais gâchée par un scénario trop linéaire et un système de combat un peu daté...', 'game.jpg', 'published', 14, 15),
(15, 'Méditation et gestion du stress', 'Prendre seulement cinq minutes par jour pour se concentrer sur sa respiration peut radicalement faire baisser l anxiété...', 'zen.jpg', 'published', 15, 16),
(16, 'Vivre avec moins d objets', 'Le minimalisme n est pas un manque, c est au contraire redonner de la valeur à ce que l on possède vraiment...', 'minimal.jpg', 'published', 16, 17);


-- =====================================================================
-- 5. INSÉRTION DES COMMENTAIRES (1 par article, rédigé par un user distinct)
-- =====================================================================
INSERT INTO comments (id, content, moderation_status, article_id, user_id) VALUES
(1, 'Super article, l explication sur les hooks est super claire !', 'approved', 1, 3),        -- Thomas commente Lisa
(2, 'Je vais tester cette routine dès demain matin, merci !', 'approved', 2, 4),     -- Julie commente Thomas
(3, 'Un délice ! Testé et approuvé par toute la famille.', 'approved', 3, 5),     -- Maxime commente Julie
(4, 'La composition de ta troisième photo est vraiment incroyable.', 'approved', 4, 6), -- Emma commente Maxime
(5, 'Pas facile de s y mettre au début mais les étapes aident bien.', 'approved', 5, 7),   -- Lucas commente Emma
(6, 'Le prix de vente reste quand même un sacré frein à l achat.', 'approved', 6, 8),     -- Chloé commente Lucas
(7, 'J adore totalement les associations de couleurs proposées.', 'approved', 7, 9),      -- Nathan commente Chloé
(8, 'Totalement d accord avec ton numéro 2 de la liste !', 'approved', 8, 10),    -- Inès commente Nathan
(9, 'Les photos donnent tellement envie d y aller !', 'approved', 9, 11),         -- Hugo commente Inès
(10, 'Merci pour les précieux conseils sur la récupération active.', 'approved', 10, 12),  -- Sarah commente Hugo
(11, 'Ce thriller est déjà commandé et placé dans ma liste d attente !', 'approved', 11, 13),-- Enzo commente Sarah
(12, 'Docker change vraiment la vie une fois mis en production.', 'approved', 12, 14),   -- Camille commente Enzo
(13, 'Tes styles et choix de couleurs m inspirent énormément.', 'approved', 13, 15),     -- Arthur commente Camille
(14, 'Je bloque sur le boss du chapitre 3, il est beaucoup trop dur !', 'approved', 14, 16), -- Manon commente Arthur
(15, 'Un sujet essentiel traité avec beaucoup de douceur, merci.', 'approved', 15, 17),  -- Léo commente Manon
(16, 'Contenu très inspirant, hâte de lire ton prochain billet !', 'approved', 16, 1);    -- L Admin commente Léo


-- =====================================================================
-- 6. INSÉRTION DES 5 SIGNALEMENTS (2 Blogs, 1 Article, 2 Commentaires)
-- =====================================================================
-- Étape A : On crée les 5 fiches de signalements globales
INSERT INTO reports (id, report_reason, description, status) VALUES
(1, 'spam', 'Ce blog ne contient que des liens vers des sites malveillants de contrefaçons.', 'active'),
(2, 'inappropriate', 'La bannière de ce blog présente du contenu graphique non modéré.', 'active'),
(3, 'copyright', 'Cet article est un copier-coller intégral d un papier universitaire protégé.', 'active'),
(4, 'bully', 'Propos injurieux proférés à l encontre de l auteur dans l espace commentaire.', 'active'),
(5, 'spam', 'Publicité intempestive glissée au milieu du message.', 'active');



-- Étape B : On fait les liaisons dans la table Pivot "users_reports"
-- (Chaque report est lié à l utilisateur qui signale, et à l entité ciblée)
INSERT INTO users_reports (user_id, blog_id, article_id, comment_id, report_id) VALUES
(10, 1,    NULL, NULL, 1), -- Inès (User 10) signale le Blog de Lisa (Blog 1)
(11, 2,    NULL, NULL, 2), -- Hugo (User 11) signale le Blog de Thomas (Blog 2)
(12, NULL, 3,    NULL, 3), -- Sarah (User 12) signale l Article de Julie (Article 3)
(13, NULL, NULL, 1,    4), -- Enzo (User 13) signale le Commentaire de Thomas (Commentaire 1)
(14, NULL, NULL, 2,    5); -- Camille (User 14) signale le Commentaire de Julie (Commentaire 2)
