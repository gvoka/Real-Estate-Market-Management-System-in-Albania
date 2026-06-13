-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: menaxhim_pronash
-- ------------------------------------------------------
-- Server version	8.0.46

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
-- Table structure for table `historikcmimi`
--

DROP TABLE IF EXISTS `historikcmimi`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `historikcmimi` (
  `idHistorikCmimi` int NOT NULL AUTO_INCREMENT,
  `Datat` date DEFAULT NULL,
  `Cmimet` decimal(10,2) DEFAULT NULL,
  `idPronat` int DEFAULT NULL,
  PRIMARY KEY (`idHistorikCmimi`),
  KEY `idPronat` (`idPronat`),
  CONSTRAINT `historikcmimi_ibfk_1` FOREIGN KEY (`idPronat`) REFERENCES `pronat` (`idPronat`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `historikcmimi`
--

LOCK TABLES `historikcmimi` WRITE;
/*!40000 ALTER TABLE `historikcmimi` DISABLE KEYS */;
INSERT INTO `historikcmimi` VALUES (3,'2026-04-01',90000.00,1),(4,'2026-04-15',240000.00,2);
/*!40000 ALTER TABLE `historikcmimi` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perdoruesit`
--

DROP TABLE IF EXISTS `perdoruesit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perdoruesit` (
  `idPerdoruesit` int NOT NULL AUTO_INCREMENT,
  `Emer` varchar(45) DEFAULT NULL,
  `Mbiemer` varchar(45) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `Fjalekalimi` varchar(255) DEFAULT NULL,
  `Data_e_regjistrimit` date DEFAULT NULL,
  `idRolet` int DEFAULT NULL,
  PRIMARY KEY (`idPerdoruesit`),
  UNIQUE KEY `Email` (`Email`),
  KEY `idRolet` (`idRolet`),
  KEY `idx_perdorues_email` (`Email`),
  CONSTRAINT `perdoruesit_ibfk_1` FOREIGN KEY (`idRolet`) REFERENCES `rolet` (`idRolet`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perdoruesit`
--

LOCK TABLES `perdoruesit` WRITE;
/*!40000 ALTER TABLE `perdoruesit` DISABLE KEYS */;
INSERT INTO `perdoruesit` VALUES (1,'Ardit','Hoxha','ardithoxha@gmail.com','12345','2026-05-01',2),(2,'Sara','Kola','sarakola@gmail.com','abcdef','2026-05-03',2),(3,'Erion','Meta','erionmeta@gmail.com','audit2026','2026-05-04',3),(4,'Ela','Dervishi','eladervishi@gmail.com','qytetar1','2026-05-05',4),(6,'Andi','Hoxha','andihoxha@gmail.com','Andi1234','2026-05-18',4),(7,'Admin','Sistemi','admin@gmail.com','admin123','2026-05-18',1),(8,'Jane','Doe','janedoe@gmail.com','Jane1234','2026-05-19',2),(9,'Bora','Lala','boralala@gmail.com','Bora123','2026-05-19',3),(10,'Kaltrina','Gjiuta','kaltrinagjuta@gmail.com','12345678','2026-05-20',2),(11,'Eneida','Hoxha','eneidahoxha@gmail.com','123456789','2026-05-20',4);
/*!40000 ALTER TABLE `perdoruesit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pronat`
--

DROP TABLE IF EXISTS `pronat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pronat` (
  `idPronat` int NOT NULL AUTO_INCREMENT,
  `Tipi` varchar(45) DEFAULT NULL,
  `Siperfaqja` double DEFAULT NULL,
  `Cmimi` decimal(10,2) DEFAULT NULL,
  `idZona` int DEFAULT NULL,
  PRIMARY KEY (`idPronat`),
  KEY `idZona` (`idZona`),
  CONSTRAINT `pronat_ibfk_1` FOREIGN KEY (`idZona`) REFERENCES `zonat` (`idZona`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pronat`
--

LOCK TABLES `pronat` WRITE;
/*!40000 ALTER TABLE `pronat` DISABLE KEYS */;
INSERT INTO `pronat` VALUES (1,'Apartament',120,95000.00,1),(2,'Vile',300,250000.00,2),(3,'Dyqan',80,70000.00,3),(4,'Vile',100,1000000.00,2);
/*!40000 ALTER TABLE `pronat` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `trg_historik_cmimi` AFTER UPDATE ON `pronat` FOR EACH ROW BEGIN
    IF OLD.Cmimi <> NEW.Cmimi THEN
        INSERT INTO HistorikCmimi (Datat, Cmimet, idPronat)
        VALUES (CURDATE(), NEW.Cmimi, NEW.idPronat);
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `rolet`
--

DROP TABLE IF EXISTS `rolet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rolet` (
  `idRolet` int NOT NULL AUTO_INCREMENT,
  `EmriRolit` varchar(45) DEFAULT NULL,
  `Pershkrimi` text,
  PRIMARY KEY (`idRolet`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rolet`
--

LOCK TABLES `rolet` WRITE;
/*!40000 ALTER TABLE `rolet` DISABLE KEYS */;
INSERT INTO `rolet` VALUES (1,'Admin','Menaxhon sistemin'),(2,'Agjent','Menaxhon pronat'),(3,'Auditues','Kontrollon aktivitetet dhe transaksionet'),(4,'Qytetar','Perdorues i thjeshte i sistemit');
/*!40000 ALTER TABLE `rolet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaksionet`
--

DROP TABLE IF EXISTS `transaksionet`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaksionet` (
  `idTransaksionet` int NOT NULL AUTO_INCREMENT,
  `Data` date DEFAULT NULL,
  `Vlera` decimal(10,2) DEFAULT NULL,
  `idPerdoruesit` int DEFAULT NULL,
  `idPronat` int DEFAULT NULL,
  PRIMARY KEY (`idTransaksionet`),
  KEY `idPerdoruesit` (`idPerdoruesit`),
  KEY `idPronat` (`idPronat`),
  CONSTRAINT `transaksionet_ibfk_1` FOREIGN KEY (`idPerdoruesit`) REFERENCES `perdoruesit` (`idPerdoruesit`),
  CONSTRAINT `transaksionet_ibfk_2` FOREIGN KEY (`idPronat`) REFERENCES `pronat` (`idPronat`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaksionet`
--

LOCK TABLES `transaksionet` WRITE;
/*!40000 ALTER TABLE `transaksionet` DISABLE KEYS */;
INSERT INTO `transaksionet` VALUES (3,'2026-05-10',95000.00,1,1),(4,'2026-05-12',250000.00,2,2);
/*!40000 ALTER TABLE `transaksionet` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_pronat_zonat`
--

DROP TABLE IF EXISTS `view_pronat_zonat`;
/*!50001 DROP VIEW IF EXISTS `view_pronat_zonat`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `view_pronat_zonat` AS SELECT 
 1 AS `idPronat`,
 1 AS `Tipi`,
 1 AS `Siperfaqja`,
 1 AS `Cmimi`,
 1 AS `Zona`,
 1 AS `Qyteti`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `zonat`
--

DROP TABLE IF EXISTS `zonat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `zonat` (
  `idZona` int NOT NULL AUTO_INCREMENT,
  `Emri` varchar(50) DEFAULT NULL,
  `Qyteti` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`idZona`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `zonat`
--

LOCK TABLES `zonat` WRITE;
/*!40000 ALTER TABLE `zonat` DISABLE KEYS */;
INSERT INTO `zonat` VALUES (1,'Qendra','Tirane'),(2,'Liqeni','Tirane'),(3,'Vasil Shanto','Tirane'),(4,'Blloku','Tirane');
/*!40000 ALTER TABLE `zonat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'menaxhim_pronash'
--

--
-- Dumping routines for database 'menaxhim_pronash'
--
/*!50003 DROP FUNCTION IF EXISTS `MesatarjaCmimit` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `MesatarjaCmimit`() RETURNS decimal(10,2)
    DETERMINISTIC
BEGIN

    DECLARE mesatarja DECIMAL(10,2);

    SELECT AVG(Cmimi)
    INTO mesatarja
    FROM Pronat;

    RETURN mesatarja;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `view_pronat_zonat`
--

/*!50001 DROP VIEW IF EXISTS `view_pronat_zonat`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `view_pronat_zonat` AS select `p`.`idPronat` AS `idPronat`,`p`.`Tipi` AS `Tipi`,`p`.`Siperfaqja` AS `Siperfaqja`,`p`.`Cmimi` AS `Cmimi`,`z`.`Emri` AS `Zona`,`z`.`Qyteti` AS `Qyteti` from (`pronat` `p` join `zonat` `z` on((`p`.`idZona` = `z`.`idZona`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-13 13:40:52
