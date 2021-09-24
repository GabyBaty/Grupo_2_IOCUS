CREATE DATABASE  IF NOT EXISTS `iocus_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `iocus_db`;
-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: localhost    Database: iocus_db
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ages`
--

DROP TABLE IF EXISTS `ages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ages`
--

LOCK TABLES `ages` WRITE;
/*!40000 ALTER TABLE `ages` DISABLE KEYS */;
INSERT INTO `ages` VALUES (1,'0 a 24 meses','2021-09-21 00:19:55','2021-09-21 00:19:55'),(2,'2 a 4 años','2021-09-21 00:19:55','2021-09-21 00:19:55'),(3,'5 a 7 años','2021-09-21 00:19:55','2021-09-21 00:19:55'),(4,'8 a 13 años','2021-09-21 00:19:55','2021-09-21 00:19:55'),(5,'14 años y mayores','2021-09-21 00:19:55','2021-09-21 00:19:55');
/*!40000 ALTER TABLE `ages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Hasbro','2021-09-21 00:19:55','2021-09-21 00:19:55'),(2,'Marvel','2021-09-21 00:19:55','2021-09-21 00:19:55'),(3,'Disney','2021-09-21 00:19:55','2021-09-21 00:19:55'),(4,'Mattel','2021-09-21 00:19:55','2021-09-21 00:19:55'),(5,'Lego','2021-09-21 00:19:55','2021-09-21 00:19:55'),(6,'Playmates','2021-09-21 00:19:55','2021-09-21 00:19:55');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quantity` int DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `userId` int DEFAULT NULL,
  `paymentId` int DEFAULT NULL,
  `total` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  KEY `userId` (`userId`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`),
  CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`id`),
  CONSTRAINT `carts_ibfk_3` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Difraces','2021-09-21 00:19:55','2021-09-21 00:19:55'),(2,'Figuras de acción','2021-09-21 00:19:55','2021-09-21 00:19:55'),(3,'Juegos de mesa','2021-09-21 00:19:55','2021-09-21 00:19:55'),(4,'Vehiculos','2021-09-21 00:19:55','2021-09-21 00:19:55');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `file` varchar(255) DEFAULT NULL,
  `productId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId` (`productId`),
  CONSTRAINT `images_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'imagen_3.jpg',1,'2021-09-21 00:19:55','2021-09-24 16:19:22'),(2,'imagen_4.jpg',1,'2021-09-21 00:19:55','2021-09-24 16:19:22'),(3,'imagen_5.jpg',1,'2021-09-21 00:19:55','2021-09-24 16:19:22'),(4,'FAC002main.png',2,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(5,'FAC002secondary1.png',2,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(6,'FAC002secondary2.png',2,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(7,'JDM003main.png',3,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(8,'JDM003secondary1.png',3,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(9,'JDM003secondary2.png',3,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(10,'FAC004main.png',4,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(11,'FAC004secondary1.png',4,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(12,'FAC004secondary2.png',4,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(13,'JDM005main.png',5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(14,'JDM005secondary1.png',5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(15,'JDM005secondary2.png',5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(16,'VAC006main.png',6,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(17,'VAC006secondary1.png',6,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(18,'VAC006secondary2.png',6,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(19,'VAC007main.png',7,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(20,'VAC007secondary1.png',7,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(21,'VAC007secondary2.png',7,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(22,'DIZ008main.png',8,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(23,'DIZ008secondary1.png',8,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(24,'DIZ008secondary2.png',8,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(25,'JDM009main.png',9,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(26,'JDM009secondary1.png',9,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(27,'JDM009secondary2.png',9,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(28,'JDM010main.png',10,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(29,'JDM010secondary1.png',10,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(30,'JDM010secondary2.png',10,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(31,'DIZ011main.png',11,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(32,'DIZ011secondary1.png',11,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(33,'DIZ011secondary2.png',11,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(34,'12bis.png',12,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(35,'12bis2.png',12,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(36,'12bis3.png',12,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(37,'Harly.jpg',13,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(38,'Harly2.jpg',13,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(39,'Harly3.jpg',13,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(40,'leonardo.jpg',14,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(41,'Leonardo2.jpg',14,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(42,'Leonardo3.jpg',14,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(43,'monopoly.jpg',15,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(44,'monopoly2.jpg',15,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(45,'FAC001secondary2.jpg',15,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(46,'Elsa.webp',16,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(47,'Elsa2.jpg',16,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(48,'Elsa3.jpg',16,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(81,'imagen_1.jpg',43,'2021-09-24 20:17:39','2021-09-24 20:17:39'),(82,'imagen_2.jpg',43,'2021-09-24 20:17:39','2021-09-24 20:17:39');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(500) DEFAULT NULL,
  `price` decimal(8,0) DEFAULT NULL,
  `discount` int DEFAULT NULL,
  `sku` varchar(255) DEFAULT NULL,
  `destacado` tinyint(1) DEFAULT NULL,
  `stock` int DEFAULT NULL,
  `categoryId` int DEFAULT NULL,
  `brandId` int DEFAULT NULL,
  `ageId` int DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categoryId` (`categoryId`),
  KEY `brandId` (`brandId`),
  KEY `ageId` (`ageId`),
  CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`),
  CONSTRAINT `products_ibfk_2` FOREIGN KEY (`brandId`) REFERENCES `brands` (`id`),
  CONSTRAINT `products_ibfk_3` FOREIGN KEY (`ageId`) REFERENCES `ages` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Figura Kakashi Hatake','DESCRIPCIÓN DEL PRODUCTO product description DESCRIPCIÓN DEL PRODUCTO product description',5000,50,'FAC001',1,20,2,2,1,'2021-09-21 00:19:55','2021-09-24 17:23:23'),(2,'Figura Thanos','Este tipo se hizo el loco y quise hacer explotar la mitad del universo. Ahora vuelve re zarpado en forma de figurita',12500,7,'FAC002',1,45,2,2,4,'2021-09-21 00:19:55','2021-09-22 04:01:03'),(3,'Juego de cartas Uno','Uno es el clásico juego de cartas familiar que es fácil de aprender y muy divertido de jugar. En una carrera para agotar tu mano, combina una de tus cartas con la carta actual que se muestra en la parte superior de la baraja por color o número.    Estrategias para derrotar a tu competencia con tarjetas de acción especiales como saltos, reversos, Draw Twos y tarjetas salvajes que cambian de color.    Cuando estés bajo una tarjeta, no te olvides de gritar \'UNO\'',2500,25,'JDM003',1,65,3,4,4,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(4,'Figura Batman','La figura de Batman se basa en el estilo icónico de la serie animada de Batman. Diseñado con ultra articulación con hasta 22 partes móviles para una gama completa de posar y jugar.',8500,19,'FAC004',1,25,2,4,1,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(5,'Rompecabezas de madera ','Un diseño gráfico brillante, enseñando a los niños a reconocer letras y números correctamente. Promueve la coordinación ojo-mano y habilidades de resolución de problemas, ayuda a desarrollar habilidades a juego.',3500,20,'JDM005',1,0,3,6,2,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(6,'Coches de juguete','3 juegos de camiones monstruos: El juego de camiones monstruos incluye 3 figuras únicas de animales salvajes de juguete modelo de coche: toro, leopardo y cocodrilo. No necesita pilas, ahorra energía y es respetuoso con el medio ambiente.',1200,80,'VAC006',1,30,4,6,2,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(7,'Cars Auto Remote','LIGHTNING MCQUEEN: Ayuda a Lightning McQueen a derrotar a su nuevo rival Jackson Storm con tu propio coche de carreras McQueen a control remoto.',11200,10,'VAC007',1,30,4,4,5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(8,'Disfraz Darth Vader','Incluye traje, máscara, guantes, cinturón y capa desmontable. Presione el botón en el cinturón para escuchar ocho frases de Darth Vader.',3500,10,'DIZ008',1,30,1,3,5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(9,'Juego de la Vida','Elige un camino para una vida de acción, aventura y sorpresas inesperadas',4600,0,'JDM009',0,0,3,1,5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(10,'TEG Tradicional Juego de Mesa Tactico','El juego propone un conflicto bélico que tiene lugar en un planisferio dividido en 50 países. Cada jugador tiene un objetivo secreto a cumplir, para lo cual deberá ampliar sus dominios, reordenar sus fuerzas, realizar pactos, emprender ataques y defenderse de los adversarios. El primer jugador en lograr su objetivo, o conquistar 30 países (objetivo común), ¡Será el ganador! ¡¿Qué esperas para salir a conquistar el mundo?! ¿Te animas a desafiarte?',3670,0,'JDM010',0,15,3,6,5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(11,'Difraz de Freddy','Disfraz de Freddy Niño Talle 2, asusta a tus amigos en Halloween',1990,0,'DIZ011',0,50,1,3,3,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(12,'Shimmer y Shine y sus mascotas','Diviertete con Shimmer y Shine y sus adorables mascotas Tala y Nahal',1850,0,'MUÑ001',0,30,2,3,3,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(13,'Harley Quinn','Figura coleccionable.Producida con un impecable tratamiento de pintura.',1500,0,'FAC013',0,10,2,5,5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(14,'Leonardo','Figura coleccionable. Leonardo de Teenage Mutant Ninja Turtles de la linea Ninja Elite Series',4500,0,'FAC014',0,30,2,6,5,'2021-09-21 00:19:55','2021-09-23 03:31:04'),(15,'Monopoly','¡Un clásico! Reuní a tus amistades para disfrutar de horas de risas y diversión mientras juegan a ser agentes inmobiliarios con el Monopoly. Deberán comprar, vender e intercambiar propiedades estratégicamente para aumentar sus fortunas, si te declarás en quiebra... ¡perdiste!',4900,0,'JGM003',0,10,3,1,5,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(16,'Difraz Elsa Frozen','Este increíble color azul glaciar del vestido, va en degradado, dándole más luminosidad a la parte superior del traje y fuerza a su pisada con el tono más oscuro al final. Incluye una elegante capa transparente y unos detalles brillantes a modo de corpiño cubierto de cristales de hielo.',3500,0,'JGM004',0,20,1,3,3,'2021-09-21 00:19:55','2021-09-21 00:19:55'),(43,'zapatillas','dsadsadsa',5000,5,'1dasf',0,12,2,2,1,'2021-09-24 20:17:39','2021-09-24 20:17:57');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sequelizemeta`
--

DROP TABLE IF EXISTS `sequelizemeta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sequelizemeta`
--

LOCK TABLES `sequelizemeta` WRITE;
/*!40000 ALTER TABLE `sequelizemeta` DISABLE KEYS */;
INSERT INTO `sequelizemeta` VALUES ('20210920232314-create-category.js'),('20210920232346-create-brand.js'),('20210920232358-create-age.js'),('20210920232609-create-product.js'),('20210920232650-create-image.js'),('20210920232844-create-user.js'),('20210920232903-create-payment.js'),('20210920233015-create-cart.js');
/*!40000 ALTER TABLE `sequelizemeta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) DEFAULT NULL,
  `apellido` varchar(255) DEFAULT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Damian','Trajster','damiantrajster@gmail.com','$2a$10$zVekYqBzYi14Dbgx8G7xTOCUI0Nsx2iuu4.m0151l8wy5eoEhy5Fe','fotoUsuario-1632514603591.jpg','Administrador','2021-09-21 03:51:26','2021-09-24 20:16:56'),(2,'Euge','Amaya','hola@hola.com','$2a$10$u7tx70kKzIqeSjfi0aVFTuSPvb69syUtxjJkpjLPDA7OShIOHcFXu','default.png','Usuario','2021-09-22 02:08:49','2021-09-22 02:08:49');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-09-24 17:24:15
