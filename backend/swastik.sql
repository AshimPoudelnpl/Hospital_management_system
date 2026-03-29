-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hospital_management_system
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `appointments`
--

DROP TABLE IF EXISTS `appointments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `patient_name` varchar(100) NOT NULL,
  `patient_email` varchar(100) NOT NULL,
  `patient_phone` varchar(20) NOT NULL,
  `doctor_id` int DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `appointment_date` date NOT NULL,
  `appointment_time` time NOT NULL,
  `message` text,
  `status` enum('pending','confirmed','cancelled','completed') DEFAULT 'pending',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `doctor_id` (`doctor_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `appointments_ibfk_1` FOREIGN KEY (`doctor_id`) REFERENCES `doctors` (`id`) ON DELETE SET NULL,
  CONSTRAINT `appointments_ibfk_2` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointments`
--

LOCK TABLES `appointments` WRITE;
/*!40000 ALTER TABLE `appointments` DISABLE KEYS */;
INSERT INTO `appointments` VALUES (1,'John Doe','john@example.com','9800000000',NULL,NULL,'2026-03-25','10:30:00','Regular checkup','completed','2026-03-20 07:34:48'),(4,'aaaaaaaaaaaaaaaaa','yadavpoudel641@gmail.com','6535553555',5,NULL,'2026-03-21','21:49:00','aaaaaaaaaaaaa','pending','2026-03-21 16:02:56'),(5,'aaaaaaaaaaaaaaaaa','yadavpoudel641@gmail.com','121111',6,NULL,'2026-03-28','07:48:00','hjjjjjjjjjjjjjjjjjjjjjjjjjj','pending','2026-03-22 02:02:57'),(6,'aghffhafhdf','kantimayasapkota@gmail.com','9868077874',2,NULL,'2026-03-25','14:04:00','sjhdkhkfjfhdkjshf','pending','2026-03-22 08:18:41'),(7,'aghffhafhdf','kantimayasapkota@gmail.com','9868077874',5,NULL,'2026-03-25','14:15:00','sghhshsgsh','pending','2026-03-22 08:28:35'),(8,'gafgafag','kantimayasapkota@gmail.com','9868077874',2,NULL,'2026-03-26','15:19:00','zzzzzzzzzzz','completed','2026-03-22 09:34:04'),(9,'aaaaaaaaaaaaaaaaa','tripbad743@gmail.com','981525626556',2,NULL,'2026-03-26','11:38:00','throid,stomach pain','pending','2026-03-24 03:54:24'),(10,'prem prakash bk','tripbad743@gmail.com','399898989898',2,NULL,'2026-03-25','09:42:00','dnnnnnnnnnnnn','pending','2026-03-24 03:58:01');
/*!40000 ALTER TABLE `appointments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contacts`
--

DROP TABLE IF EXISTS `contacts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contacts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_email` (`email`),
  UNIQUE KEY `unique_phone` (`phone`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contacts`
--

LOCK TABLES `contacts` WRITE;
/*!40000 ALTER TABLE `contacts` DISABLE KEYS */;
INSERT INTO `contacts` VALUES (3,'Yadav Poudel','yadavpoudel641@gmail.com','33333333','hdfghfghdgfgh','2026-03-24 04:04:54'),(7,'Ashim Poudel','ashimpdl7@gmail.com','9866938081','aaaaaaaaaaaaa','2026-03-24 15:30:11');
/*!40000 ALTER TABLE `contacts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_services`
--

DROP TABLE IF EXISTS `department_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `department_id` int NOT NULL,
  `service_name` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `department_services_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_services`
--

LOCK TABLES `department_services` WRITE;
/*!40000 ALTER TABLE `department_services` DISABLE KEYS */;
/*!40000 ALTER TABLE `department_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `departments`
--

DROP TABLE IF EXISTS `departments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `departments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `head_doctor` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `services` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_department_name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `departments`
--

LOCK TABLES `departments` WRITE;
/*!40000 ALTER TABLE `departments` DISABLE KEYS */;
INSERT INTO `departments` VALUES (21,'cardiology','cmmmmmmmmmm','uploads\\departments\\1774369877320-568019768-OIP.webp','ram prasad','2026-03-24 16:31:17',NULL),(22,'smj','sssssssssssssss','uploads\\departments\\1774370526461-387867624-OIP.webp','ssssssssssssss','2026-03-24 16:42:06',NULL);
/*!40000 ALTER TABLE `departments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctors`
--

DROP TABLE IF EXISTS `doctors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `specialty` varchar(100) NOT NULL,
  `experience` varchar(50) DEFAULT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `display_order` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `doctors_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctors`
--

LOCK TABLES `doctors` WRITE;
/*!40000 ALTER TABLE `doctors` DISABLE KEYS */;
INSERT INTO `doctors` VALUES (2,'Dr. Ram Sharma','Cardiologist','10 years','Expert in heart-related treatments','uploads\\doctors\\portrait-drpradip.jpg',NULL,'2026-03-20 07:17:25',1),(3,'Dr. Sita Karki','Cardiologist','8 years','Heart specialist','uploads\\doctors\\portrait-drdipesh.png',NULL,'2026-03-20 07:17:25',2),(4,'Dr. Hari Bhandari','Neurologist','12 years','Brain specialist','uploads\\doctors\\1774145620147-69564268-d4_1712726117.jpg',NULL,'2026-03-20 07:17:25',3),(5,'Dr. Gita Thapa','Orthopedic','7 years','Bone specialist','uploads\\doctors\\1774145632580-934753241-drdhan keshar khadka.jpg',NULL,'2026-03-20 07:17:25',4),(6,'Dr. Binod Adhikari','Pediatrician','9 years','Child specialist','uploads\\doctors\\1774145645260-717477833-drpiush kanodia.jpg',NULL,'2026-03-20 07:17:25',5),(9,'Dr. Ram Sharma','Cardiologist','10 years','Expert in heart-related treatments and surgeries','uploads\\doctors\\portrait-drpradip.jpg',NULL,'2026-03-20 10:56:22',1),(10,'Dr. Ram Sharmaya','urologist','10 years','Expert in heart-related treatments and surgeries','uploads\\doctors\\portrait-drdipesh.png',NULL,'2026-03-20 11:34:02',1),(11,'kahskshjka','urologist','3','jchjkdhcj','uploads\\doctors\\1774145620147-69564268-d4_1712726117.jpg',NULL,'2026-03-24 06:47:19',1),(12,'hsgjhsghs','urology','4','Expert in heart-Expert in heart-related treatments and surgeriesExpert in heart-related treatments and surgeriesExpert in heart-related treatments and surgeriesrelated treatments and surgeries','uploads\\doctors\\1774145632580-934753241-drdhan keshar khadka.jpg',NULL,'2026-03-24 06:52:22',2),(13,'amnms','dddddd','ddd','ddd','uploads\\doctors\\1774145645260-717477833-drpiush kanodia.jpg',NULL,'2026-03-24 15:42:19',1);
/*!40000 ALTER TABLE `doctors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notices`
--

DROP TABLE IF EXISTS `notices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notices` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `content` text NOT NULL,
  `created_by` int unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `image` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`),
  KEY `created_by` (`created_by`),
  CONSTRAINT `notices_ibfk_1` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notices`
--

LOCK TABLES `notices` WRITE;
/*!40000 ALTER TABLE `notices` DISABLE KEYS */;
INSERT INTO `notices` VALUES (1,'Update Notice','New features have been added.',1,'2026-03-20 11:14:02',NULL,''),(2,'सूचना (NOTICE)','यस अस्पतालका सम्पूर्ण सेवाग्राहीहरूलाई जानकारी गराइन्छ कि अस्पतालले बिरामीहरूको सेवा अझ प्रभावकारी, सुरक्षित र व्यवस्थित बनाउन निम्न नियमहरू लागू गरेको छः\n\nअस्पतालमा प्रवेश गर्दा अनिवार्य रूपमा मास्क प्रयोग गर्नुहोस्।\nबिरामी भेट्न आउने आगन्तुकहरू तोकिएको समयभित्र मात्र आउनुहोस्।\nअस्पताल परिसरमा सरसफाइ कायम राख्न सहयोग गर्नुहोस्।\nआपतकालीन सेवा २४ सै घण्टा उपलब्ध छ।\nकुनै पनि जानकारी वा सहयोगका लागि स्वागत कक्ष (Reception) मा सम्पर्क गर्नुहोस्।',1,'2026-03-22 06:43:42',NULL,NULL),(3,'qqqqqqqqw','qqqqqqqqqqqqqqq',1,'2026-03-24 07:48:30','uploads/notices/1774338510600-422583221-472259006_1317315349617590_869938120820162795_n.jpg','qqqqqq-qqqqq'),(4,'sarbojanikk bida','kjsakdjkjshkn',1,'2026-03-24 13:43:15','uploads/notices/1774359795700-369754145-Screenshot 2026-03-10 201221.png','sarbojanikk-bida'),(5,'Maintenance Notice','The hospital system will be under maintenance on Sunday from 2:00 AM to 5:00 AM. Services may be temporarily unavailable.',1,'2026-03-25 07:07:16',NULL,'maintenance-notice');
/*!40000 ALTER TABLE `notices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `rating` int DEFAULT NULL,
  `review_text` text,
  `display_order` int DEFAULT '0',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `reviews_chk_1` CHECK ((`rating` between 1 and 5))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (2,'Sita Sharma',4,'Doctor was very friendly',0,'2026-03-23 08:28:50'),(3,'smmmmmmmmm',5,'ssssssssss',0,'2026-03-23 14:36:24'),(4,'shgjdgs',4,'asasass',0,'2026-03-24 06:55:49');
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `services`
--

DROP TABLE IF EXISTS `services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `services`
--

LOCK TABLES `services` WRITE;
/*!40000 ALTER TABLE `services` DISABLE KEYS */;
INSERT INTO `services` VALUES (5,'OPD','zhjkjhhkshdj','uploads\\services\\1774324221135-634672175-ordinary-busy-day-surgeon.jpg','2026-03-24 03:50:21'),(6,'ECG','shhdjh','uploads\\services\\1774334559959-52964228-medium-shot-doctor-checking-blood-pressure-female-patient.jpg','2026-03-24 06:42:40');
/*!40000 ALTER TABLE `services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` text NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','admin@gmail.com','$2a$12$q/4eSxy4IaEP3DPhyYRZYu7CygR99se5kt4W.8whMi6XyUifXYQka','2026-03-19 08:37:24');
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

-- Dump completed on 2026-03-29 13:08:53
