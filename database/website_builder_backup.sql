-- MySQL dump 10.13  Distrib 8.0.39, for Linux (x86_64)
--
-- Host: localhost    Database: website_builder
-- ------------------------------------------------------
-- Server version	8.0.39-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `banner`
--

DROP TABLE IF EXISTS `banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `banner` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `BANNER_TEXT` varchar(255) NOT NULL,
  `BANNER_BUTTON_TEXT` varchar(255) NOT NULL,
  `BUTTON_LINK` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_banner_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banner`
--

LOCK TABLES `banner` WRITE;
/*!40000 ALTER TABLE `banner` DISABLE KEYS */;
INSERT INTO `banner` VALUES (1,'GeneriCon 2023 Join us in Denver from June 7 – 9 to see what’s coming next','Register now','https://www.youtube.com/watch?v=f4Lqk0iBsUo');
/*!40000 ALTER TABLE `banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blog_category`
--

DROP TABLE IF EXISTS `blog_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blog_category` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_blog_category_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blog_category`
--

LOCK TABLES `blog_category` WRITE;
/*!40000 ALTER TABLE `blog_category` DISABLE KEYS */;
INSERT INTO `blog_category` VALUES (6,'Marketing'),(7,'SEO'),(8,'Customer Success'),(9,'Design'),(10,'Development');
/*!40000 ALTER TABLE `blog_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `blogs`
--

DROP TABLE IF EXISTS `blogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `blogs` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `BLOG_NAME` varchar(255) DEFAULT NULL,
  `BLOG_DESCRIPTION` text,
  `AUTHOR_NAME` varchar(255) DEFAULT NULL,
  `AUTHOR_IMAGE` varchar(255) DEFAULT NULL,
  `CREATED_DATE` datetime DEFAULT NULL,
  `CATEGORY` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_blogs_BLOG_NAME` (`BLOG_NAME`),
  KEY `ix_blogs_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `blogs`
--

LOCK TABLES `blogs` WRITE;
/*!40000 ALTER TABLE `blogs` DISABLE KEYS */;
INSERT INTO `blogs` VALUES (1,'Boost your conversion rate','Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus mattis rhoncus urna neque viverra justo. Vivamus at augue eget arcu dictum varius duis at consectetur lorem.',' Michael Foster','/blog_author_1.png','2024-10-18 15:32:31','Marketing'),(2,'Boost your conversion rate','Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus mattis rhoncus urna neque viverra justo. Vivamus at augue eget arcu dictum varius duis at consectetur lorem.','Babu reddy','/blog_author_2.png','2024-10-18 15:34:04','SEO'),(3,'Boost your conversion rate','Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus mattis rhoncus urna neque viverra justo. Vivamus at augue eget arcu dictum varius duis at consectetur lorem.','Babu reddy','/blog_author_3.png','2024-10-18 15:34:28','Customer Success'),(4,'Boost your conversion rate','Eget mi proin sed libero enim sed faucibus turpis. Nisl rhoncus mattis rhoncus urna neque viverra justo. Vivamus at augue eget arcu dictum varius duis at consectetur lorem.','Babu reddy','/blog_author_4.png','2024-10-18 15:35:02','Design');
/*!40000 ALTER TABLE `blogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients`
--

DROP TABLE IF EXISTS `clients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clients` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CLIENT_NAME` varchar(255) NOT NULL,
  `CLIENT_LOGO` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_clients_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients`
--

LOCK TABLES `clients` WRITE;
/*!40000 ALTER TABLE `clients` DISABLE KEYS */;
INSERT INTO `clients` VALUES (13,'Vercel','/client_logo_13.png'),(14,'AWS','/client_logo_14.png'),(15,'Microsoft','/client_logo_15.png'),(16,'Netflix','/client_logo_16.png'),(17,'Disney','/client_logo_17.png'),(18,'Adobe','/client_logo_18.png'),(19,'demo','/client_logo_19.png');
/*!40000 ALTER TABLE `clients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color_theme`
--

DROP TABLE IF EXISTS `color_theme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `color_theme` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `COLOR1` varchar(7) NOT NULL,
  `COLOR2` varchar(7) NOT NULL,
  `COLOR3` varchar(7) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_color_theme_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color_theme`
--

LOCK TABLES `color_theme` WRITE;
/*!40000 ALTER TABLE `color_theme` DISABLE KEYS */;
INSERT INTO `color_theme` VALUES (1,'#850000','#9f0404','#a59292');
/*!40000 ALTER TABLE `color_theme` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `HEADER` varchar(255) NOT NULL,
  `TAGLINE` varchar(255) NOT NULL,
  `PHONE_NUMBER` varchar(20) NOT NULL,
  `ADDRESS` text NOT NULL,
  `EMAIL` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_contact_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (1,'Get in touch.','Proin volutpat consequat porttitor cras nullam gravida at. Orci molestie a eu arcu. Sed ut tincidunt integer elementum id sem. Arcu sed malesuada et magna.','+1 (555) 234-56780','545 Mavis Island, Chicago, IL 99191','hello@example.com');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `email_settings`
--

DROP TABLE IF EXISTS `email_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `email_settings` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `FROM_MAIL` varchar(255) NOT NULL,
  `TO_MAIL` varchar(255) NOT NULL,
  `SMTP_HOST` varchar(255) NOT NULL,
  `SMTP_PORT` int NOT NULL,
  `SMTP_USERNAME` varchar(255) NOT NULL,
  `SMTP_PASSWORD` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_email_settings_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `email_settings`
--

LOCK TABLES `email_settings` WRITE;
/*!40000 ALTER TABLE `email_settings` DISABLE KEYS */;
INSERT INTO `email_settings` VALUES (1,'somnath.das@avekshaa.com','babureddys003@gmail.com','smtp.gmail.com',587,'somnath.das@avekshaa.com','cxlr fryw igds wicx');
/*!40000 ALTER TABLE `email_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `faq`
--

DROP TABLE IF EXISTS `faq`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `faq` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `QUESTION` varchar(255) NOT NULL,
  `ANSWER` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_faq_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `faq`
--

LOCK TABLES `faq` WRITE;
/*!40000 ALTER TABLE `faq` DISABLE KEYS */;
INSERT INTO `faq` VALUES (5,'What\'s the best thing about Switzerland?','I don\'t know, but the flag is a big plus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.'),(6,'How do you make holy water?','You boil the hell out of it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam aut tempora vitae odio inventore fuga aliquam nostrum quod porro. Delectus quia facere id sequi expedita natus.'),(7,'What do you call someone with no body and no nose?','Nobody knows. Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, voluptas ipsa quia excepturi, quibusdam natus exercitationem sapiente tempore labore voluptatem.'),(8,'Why do you never see elephants hiding in trees?','Because they\'re so good at it. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas cupiditate laboriosam fugiat.'),(9,'Why can\'t you hear a pterodactyl go to the bathroom?','Because the pee is silent. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsam, quas voluptatibus ex culpa ipsum, aspernatur blanditiis fugiat ullam magnam suscipit deserunt illum natus facilis atque vero consequatur! Quisquam, debitis error.'),(10,'Why did the invisible man turn down the job offer?','He couldn\'t see himself doing it. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet perspiciatis officiis corrupti tenetur. Temporibus ut voluptatibus, perferendis sed unde rerum deserunt eius.');
/*!40000 ALTER TABLE `faq` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favicon_settings`
--

DROP TABLE IF EXISTS `favicon_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `favicon_settings` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TITLE` varchar(255) NOT NULL,
  `FAVICON_PATH` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_favicon_settings_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favicon_settings`
--

LOCK TABLES `favicon_settings` WRITE;
/*!40000 ALTER TABLE `favicon_settings` DISABLE KEYS */;
INSERT INTO `favicon_settings` VALUES (1,'Website','/favicon_1.png');
/*!40000 ALTER TABLE `favicon_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_header`
--

DROP TABLE IF EXISTS `footer_header`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_header` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TAGLINE` varchar(255) NOT NULL,
  `SHOW_NEWSLETTER` tinyint(1) NOT NULL,
  `NEWSLETTER_HEADER_TEXT` varchar(255) DEFAULT NULL,
  `NEWSLETTER_TAGLINE` varchar(255) DEFAULT NULL,
  `COPYRIGHT_TEXT` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_footer_header_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_header`
--

LOCK TABLES `footer_header` WRITE;
/*!40000 ALTER TABLE `footer_header` DISABLE KEYS */;
INSERT INTO `footer_header` VALUES (1,'Making the world a better place through constructing elegant hierarchies.',1,'Subscribe to our newsletter','The latest news, articles, and resources, sent to your inbox weekly.','© 2024 Your Company, Inc. All rights reserved.');
/*!40000 ALTER TABLE `footer_header` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `footer_section`
--

DROP TABLE IF EXISTS `footer_section`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `footer_section` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `SECTION_HEADER` varchar(255) NOT NULL,
  `SECTION_ITEM_NAME` varchar(255) NOT NULL,
  `LINK_TYPE` varchar(50) NOT NULL,
  `LINK` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_footer_section_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `footer_section`
--

LOCK TABLES `footer_section` WRITE;
/*!40000 ALTER TABLE `footer_section` DISABLE KEYS */;
INSERT INTO `footer_section` VALUES (10,'Solutions','Analytics','external','/'),(12,'Solutions','Commerce','external','/'),(13,'Solutions','Insights','external','/'),(14,'Support','Pricing','external','/'),(15,'Support','Documentation','external','/'),(16,'Support','Guides','external','/'),(17,'Support','API Status','external','/'),(18,'Company','About','external','/'),(19,'Company','Blog','external','/'),(20,'Company','Jobs','external','/'),(21,'Company','Press','external','/');
/*!40000 ALTER TABLE `footer_section` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `get_in_touch`
--

DROP TABLE IF EXISTS `get_in_touch`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `get_in_touch` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `query` varchar(500) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_get_in_touch_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `get_in_touch`
--

LOCK TABLES `get_in_touch` WRITE;
/*!40000 ALTER TABLE `get_in_touch` DISABLE KEYS */;
INSERT INTO `get_in_touch` VALUES (1,'babu','reddy','babureddys003@gmail.com','8431017886','nothing this is demo testing'),(2,'test','ing','testing@gmail.co','1234567890','testing query'),(3,'','','','',''),(4,'1234','12345','testinguser1@client.com','8431017886','23r4tyuifyugkcjxdfj'),(5,'123456','23456','testinguser2@client.com','8431017886','asdffuyjhtgrfergujyhtg');
/*!40000 ALTER TABLE `get_in_touch` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `header_info`
--

DROP TABLE IF EXISTS `header_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `header_info` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `HEADER_TEXT` varchar(255) NOT NULL,
  `TAG_LINE` varchar(255) NOT NULL,
  `PAGE` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_header_info_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `header_info`
--

LOCK TABLES `header_info` WRITE;
/*!40000 ALTER TABLE `header_info` DISABLE KEYS */;
INSERT INTO `header_info` VALUES (1,'Welcome to Our Website','Your success is our priority','home'),(3,'Welcome to Our Website','Your success is our priority','home'),(4,'TRUSTED BY TEAMS FROM AROUND THE WORLD','We are proud to work with industry-leading companies across.','client'),(5,'Meet our team with babu','We\'re a dynamic group of individuals who are passionate about what we do.','team'),(6,'Loved by businesses worldwide.','Our software is so simple that people can\'t help but fall in love with it. Simplicity is easy when you just skip tons of mission-critical features.','/testimonials/'),(7,'pricing','wonderful price','/pricing/'),(8,'pricin','wonderful price','/pricing/'),(9,'Simple pricing, for everyone.','It doesn\'t matter what size your business is, our software won\'t work well for you.','/prices/'),(10,'Wonderfull','nthing','/products/'),(11,'Stay on top of customer support.','Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.','products'),(12,'From the blog','learn more about our knowledge ','blogs'),(13,'Loved by businesses worldwide.','Our software is so simple that people can\'t help but fall in love with it. Simplicity is easy when you just skip tons of mission-critical features.','testimonials'),(14,'Stay on top of customer support.','Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.','services'),(15,'Why Choose Us','Empowering Your Success with Innovative Solutions','whyChoseuse'),(16,'Why Choose Us.','Empowering Your Success with Innovative Solutions','whyChooseuse'),(17,'From the blog','learn more about our knowledge ','blogs'),(18,'From the blog','learn more about our knowledge ','blogs'),(19,'From the blog','learn more about our knowledge ','blogs'),(20,'From the blog','learn more about our knowledge ','blogs');
/*!40000 ALTER TABLE `header_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `home_page_settings`
--

DROP TABLE IF EXISTS `home_page_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `home_page_settings` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `HEADER_TEXT` varchar(255) DEFAULT NULL,
  `HEADER_TEXT_ALIGNMENT` enum('left','right','center') DEFAULT NULL,
  `TAGLINE_TEXT` varchar(255) DEFAULT NULL,
  `TAGLINE_ALIGNMENT` enum('left','right','center') DEFAULT NULL,
  `PRIMARY_BUTTON_TEXT` varchar(255) DEFAULT NULL,
  `PRIMARY_BUTTON_LINK` varchar(255) DEFAULT NULL,
  `PRIMARY_BUTTON_TYPE` varchar(50) DEFAULT NULL,
  `SECONDARY_BUTTON_TEXT` varchar(255) DEFAULT NULL,
  `SECONDARY_BUTTON_LINK` varchar(255) DEFAULT NULL,
  `SECONDARY_BUTTON_TYPE` enum('video','link') DEFAULT NULL,
  `SHOW_IN_SLIDER` tinyint(1) DEFAULT NULL,
  `OPACITY` int NOT NULL,
  `BACKGROUND_IMAGE_PATH` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_home_page_settings_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `home_page_settings`
--

LOCK TABLES `home_page_settings` WRITE;
/*!40000 ALTER TABLE `home_page_settings` DISABLE KEYS */;
INSERT INTO `home_page_settings` VALUES (15,'Data to enrich your online business','left','Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.','left','Get started','/','link','Learn More','https://www.youtube.com/embed/dQw4w9WgXcQ','video',1,20,'/background_15.png'),(16,'Revolutionize Your Workflow','center','Streamline your processes and boost productivity with our cutting-edge solutions.','center','Get started','https://www.youtube.com/embed/dQw4w9WgXcQ','video','Learn More','https://www.youtube.com/embed/dQw4w9WgXcQ','video',1,20,'/background_16.png'),(18,'Data to enrich your online business	','right','Streamline your processes and boost productivity with our cutting-edge solutions.	','right','Get started	','/','link','Learn More','https://www.youtube.com/embed/dQw4w9WgXcQ','video',1,20,'/background_18.png');
/*!40000 ALTER TABLE `home_page_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `navigation_settings`
--

DROP TABLE IF EXISTS `navigation_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `navigation_settings` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `LOGO` varchar(255) NOT NULL,
  `DARK_MODE` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_navigation_settings_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `navigation_settings`
--

LOCK TABLES `navigation_settings` WRITE;
/*!40000 ALTER TABLE `navigation_settings` DISABLE KEYS */;
INSERT INTO `navigation_settings` VALUES (1,'/logo_1.png',1);
/*!40000 ALTER TABLE `navigation_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PAGE_NAME` varchar(255) NOT NULL,
  `CONTENT_HEADER` varchar(255) NOT NULL,
  `CONTENT` text NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_pages_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
INSERT INTO `pages` VALUES (14,'demo','nothing','<p>345y6u7iglkujyhtgrfertyukilo</p>');
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paths`
--

DROP TABLE IF EXISTS `paths`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `paths` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PAGE_NAME` varchar(255) NOT NULL,
  `PAGE_PATH` varchar(255) NOT NULL,
  `SHOW` tinyint(1) NOT NULL,
  `DISABLED` tinyint(1) NOT NULL,
  `DYNAMIC_PAGE_ID` int DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_paths_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paths`
--

LOCK TABLES `paths` WRITE;
/*!40000 ALTER TABLE `paths` DISABLE KEYS */;
INSERT INTO `paths` VALUES (1,'Home','/',1,1,0),(2,'Clients','/clients',1,0,0),(3,'Why Choose Us','/why-choose-us',1,0,0),(4,'Team','/team',1,0,0),(5,'Testimonials','/testimonials',1,0,0),(6,'Pricing','/pricing',1,0,0),(7,'Products','/products',1,0,0),(8,'Services','/services',1,0,0),(9,'Contact','/contact',1,0,0),(10,'FAQ','/faq',1,0,0),(11,'Blogs','/blogs',1,0,0),(12,'demo','/demo',1,0,14);
/*!40000 ALTER TABLE `paths` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price`
--

DROP TABLE IF EXISTS `price`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PRICE_TAGLINE` varchar(255) NOT NULL,
  `PLAN_TYPE` varchar(255) NOT NULL,
  `CURRENCY_TYPE` varchar(10) NOT NULL,
  `PRICE` decimal(10,2) NOT NULL,
  `OFFER` tinyint(1) NOT NULL,
  `OFFER_PRICE` decimal(10,2) DEFAULT NULL,
  `FEATURES_INCLUDED` text,
  `FEATURES_EXCLUDED` text,
  `CTA_BUTTON_TEXT` varchar(255) DEFAULT NULL,
  `CTA_BUTTON_LINK` varchar(255) DEFAULT NULL,
  `HIGHLIGHTED_PLAN` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_price_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price`
--

LOCK TABLES `price` WRITE;
/*!40000 ALTER TABLE `price` DISABLE KEYS */;
INSERT INTO `price` VALUES (1,'Good for anyone who is self-employed and just getting started.','Starter','INR',6000.00,0,0.00,'Basic support, 5GB storage, 1 user account, Email support, Access to standard features','Priority support, Custom branding, API access, Advanced analytics, Team collaboration','Get Started','/','no'),(2,'Ideal for small businesses ready to grow.','Small Business','INR',10000.00,0,0.00,'50GB storage, 10 user accounts, Priority email support, Access to all features, Basic analytics','API access, Advanced analytics, Team collaboration, Custom branding, Dedicated account manager','Get Started','/','yes'),(3,'Advanced solutions for large-scale businesses.','Enterprise','INR',696969.69,0,0.00,'Unlimited storage, Unlimited user accounts, 24/7 priority support, Custom branding, API access, Advanced analytics, Dedicated account manager','','Get Started','/','no');
/*!40000 ALTER TABLE `price` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_plan_type`
--

DROP TABLE IF EXISTS `price_plan_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `price_plan_type` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PLAN_TYPE` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_price_plan_type_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_plan_type`
--

LOCK TABLES `price_plan_type` WRITE;
/*!40000 ALTER TABLE `price_plan_type` DISABLE KEYS */;
INSERT INTO `price_plan_type` VALUES (12,'Starter'),(13,'Small Business'),(14,'Enterprise');
/*!40000 ALTER TABLE `price_plan_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PRODUCT_NAME` varchar(255) NOT NULL,
  `PRODUCT_CATEGORY` varchar(255) NOT NULL,
  `SVG_ICON` text,
  `PRODUCT_DESCRIPTION` text,
  `LEARN_MORE` tinyint(1) NOT NULL,
  `LEARN_MORE_LINK` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_product_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (6,'Unlimited inboxes','Communication','<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <path d=\"M3 12V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.0799 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V12M3 12H6.67452C7.16369 12 7.40829 12 7.63846 12.0553C7.84254 12.1043 8.03763 12.1851 8.21657 12.2947C8.4184 12.4184 8.59136 12.5914 8.93726 12.9373L9.06274 13.0627C9.40865 13.4086 9.5816 13.5816 9.78343 13.7053C9.96237 13.8149 10.1575 13.8957 10.3615 13.9447C10.5917 14 10.8363 14 11.3255 14H12.6745C13.1637 14 13.4083 14 13.6385 13.9447C13.8425 13.8957 14.0376 13.8149 14.2166 13.7053C14.4184 13.5816 14.5914 13.4086 14.9373 13.0627L15.0627 12.9373C15.4086 12.5914 15.5816 12.4184 15.7834 12.2947C15.9624 12.1851 16.1575 12.1043 16.3615 12.0553C16.5917 12 16.8363 12 17.3255 12H21M3 12L5.32639 6.83025C5.78752 5.8055 6.0181 5.29312 6.38026 4.91755C6.70041 4.58556 7.09278 4.33186 7.52691 4.17615C8.01802 4 8.57988 4 9.70361 4H14.2964C15.4201 4 15.982 4 16.4731 4.17615C16.9072 4.33186 17.2996 4.58556 17.6197 4.91755C17.9819 5.29312 18.2125 5.8055 18.6736 6.83025L21 12\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </g></svg>','Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',1,'/'),(7,'Manage team members','Communication','<svg height=\"200px\" width=\"200px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\" fill=\"#000000\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <style type=\"text/css\"> .st0{fill:#ffffff;} </style> <g> <path class=\"st0\" d=\"M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871 c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z\"></path> <path class=\"st0\" d=\"M511.327,344.251c-2.623-15.762-15.652-37.822-25.514-47.677c-1.299-1.306-7.105-1.608-8.673-0.636 c-11.99,7.374-26.074,11.714-41.19,11.714c-15.099,0-29.184-4.34-41.175-11.714c-1.575-0.972-7.373-0.67-8.672,0.636 c-2.757,2.757-5.765,6.427-8.698,10.683c7.935,14.94,14.228,30.81,16.499,44.476c2.27,13.7,1.533,26.67-2.138,38.494 c13.038,4.717,28.673,6.787,44.183,6.787C476.404,397.014,517.804,382.987,511.327,344.251z\"></path> <path class=\"st0\" d=\"M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386 c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z\"></path> <path class=\"st0\" d=\"M335.269,277.303c-2.07-2.061-11.471-2.588-14.027-1.006c-19.448,11.966-42.271,18.971-66.755,18.971 c-24.466,0-47.3-7.005-66.738-18.971c-2.555-1.583-11.956-1.055-14.026,1.006c-16.021,16.004-37.136,51.782-41.384,77.288 c-10.474,62.826,56.634,85.508,122.148,85.508c65.532,0,132.639-22.682,122.165-85.508 C372.404,329.085,351.289,293.307,335.269,277.303z\"></path> <path class=\"st0\" d=\"M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871 c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z\"></path> <path class=\"st0\" d=\"M115.094,351.733c2.414-14.353,9.225-31.253,17.764-46.88c-2.38-3.251-4.759-6.083-6.955-8.279 c-1.299-1.306-7.097-1.608-8.672-0.636c-11.991,7.374-26.076,11.714-41.182,11.714c-15.108,0-29.202-4.34-41.183-11.714 c-1.568-0.972-7.382-0.67-8.681,0.636c-9.887,9.854-22.882,31.915-25.514,47.677c-6.468,38.736,34.924,52.762,75.378,52.762 c14.437,0,29.016-1.777,41.459-5.84C113.587,379.108,112.757,365.835,115.094,351.733z\"></path> </g> </g></svg>','Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',1,''),(8,'Spam report','Security','<svg viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\" fill=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <g> <path fill=\"none\" d=\"M0 0h24v24H0z\"></path> <path fill-rule=\"nonzero\" d=\"M17.5 2.5L23 12l-5.5 9.5h-11L1 12l5.5-9.5h11zm-1.153 2H7.653L3.311 12l4.342 7.5h8.694l4.342-7.5-4.342-7.5zM11 15h2v2h-2v-2zm0-8h2v6h-2V7z\"></path> </g> </g></svg>','Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',1,''),(9,'Fast response times','Performance','<svg fill=\"#000000\" viewBox=\"0 0 24 24\" id=\"thunder\" data-name=\"Line Color\" xmlns=\"http://www.w3.org/2000/svg\" class=\"icon line-color\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><path id=\"primary\" d=\"M17.76,10.63,9,21l2.14-8H7.05a1,1,0,0,1-1-1.36l3.23-8a1.05,1.05,0,0,1,1-.64h4.34a1,1,0,0,1,1,1.36L13.7,9H17A1,1,0,0,1,17.76,10.63Z\" style=\"fill: none; stroke: #ffffff; stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;\"></path></g></svg>','Ipsum voluptates quia dolor quidem dolorum. Sed voluptatem quis nesciunt impedit. Qui consequatur quia voluptas consequatur non fugit.',1,'/'),(10,'24/7 Support','Support','<svg viewBox=\"0 0 24 24\" role=\"img\" xmlns=\"http://www.w3.org/2000/svg\" aria-labelledby=\"supportIconTitle\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" fill=\"none\" color=\"#000000\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <title id=\"supportIconTitle\">Support</title> <path d=\"M18,9 L16,9 C14.8954305,9 14,9.8954305 14,11 L14,13 C14,14.1045695 14.8954305,15 16,15 L16,15 C17.1045695,15 18,14.1045695 18,13 L18,9 C18,4.02943725 13.9705627,0 9,0 C4.02943725,0 0,4.02943725 0,9 L0,13 C1.3527075e-16,14.1045695 0.8954305,15 2,15 L2,15 C3.1045695,15 4,14.1045695 4,13 L4,11 C4,9.8954305 3.1045695,9 2,9 L0,9\" transform=\"translate(3 3)\"></path> <path d=\"M21,14 L21,18 C21,20 20.3333333,21 19,21 C17.6666667,21 16,21 14,21\"></path> </g></svg>','Aut repellendus et officiis dolor possimus. Deserunt velit quasi sunt fuga error labore quia ipsum. Commodi autem voluptatem nam.',1,''),(11,'Analytics dashboard','Analytics','<svg fill=\"#ffffff\" viewBox=\"-0.5 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\" preserveAspectRatio=\"xMidYMid\" stroke=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <path d=\"M30.000,32.000 L23.000,32.000 C22.447,32.000 22.000,31.552 22.000,31.000 L22.000,1.000 C22.000,0.448 22.447,-0.000 23.000,-0.000 L30.000,-0.000 C30.553,-0.000 31.000,0.448 31.000,1.000 L31.000,31.000 C31.000,31.552 30.553,32.000 30.000,32.000 ZM29.000,2.000 L24.000,2.000 L24.000,30.000 L29.000,30.000 L29.000,2.000 ZM19.000,32.000 L12.000,32.000 C11.448,32.000 11.000,31.552 11.000,31.000 L11.000,17.000 C11.000,16.448 11.448,16.000 12.000,16.000 L19.000,16.000 C19.553,16.000 20.000,16.448 20.000,17.000 L20.000,31.000 C20.000,31.552 19.553,32.000 19.000,32.000 ZM18.000,18.000 L13.000,18.000 L13.000,30.000 L18.000,30.000 L18.000,18.000 ZM8.000,32.000 L1.000,32.000 C0.448,32.000 0.000,31.552 0.000,31.000 L0.000,11.000 C0.000,10.448 0.448,10.000 1.000,10.000 L8.000,10.000 C8.552,10.000 9.000,10.448 9.000,11.000 L9.000,31.000 C9.000,31.552 8.552,32.000 8.000,32.000 ZM7.000,12.000 L2.000,12.000 L2.000,30.000 L7.000,30.000 L7.000,12.000 Z\"></path> </g></svg>','Qui vel ut aut consequuntur amet accusamus. Qui omnis culpa. Unde tenetur necessitatibus rem. Nostrum aut expedita ad illum qui impedit eum.',1,'/');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_category`
--

DROP TABLE IF EXISTS `product_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_category` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_product_category_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_category`
--

LOCK TABLES `product_category` WRITE;
/*!40000 ALTER TABLE `product_category` DISABLE KEYS */;
INSERT INTO `product_category` VALUES (11,'Communication'),(12,'Security'),(13,'Performance'),(14,'Support'),(15,'Analytics');
/*!40000 ALTER TABLE `product_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service`
--

DROP TABLE IF EXISTS `service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `SERVICE_NAME` varchar(255) NOT NULL,
  `SERVICE_CATEGORY` varchar(255) NOT NULL,
  `SVG_ICON` text,
  `SERVICE_DESCRIPTION` text,
  `LEARN_MORE` tinyint(1) NOT NULL,
  `LEARN_MORE_LINK` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_service_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service`
--

LOCK TABLES `service` WRITE;
/*!40000 ALTER TABLE `service` DISABLE KEYS */;
INSERT INTO `service` VALUES (3,'Unlimited inboxes','Communication','<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <path d=\"M3 12V15.8C3 16.9201 3 17.4802 3.21799 17.908C3.40973 18.2843 3.71569 18.5903 4.09202 18.782C4.51984 19 5.0799 19 6.2 19H17.8C18.9201 19 19.4802 19 19.908 18.782C20.2843 18.5903 20.5903 18.2843 20.782 17.908C21 17.4802 21 16.9201 21 15.8V12M3 12H6.67452C7.16369 12 7.40829 12 7.63846 12.0553C7.84254 12.1043 8.03763 12.1851 8.21657 12.2947C8.4184 12.4184 8.59136 12.5914 8.93726 12.9373L9.06274 13.0627C9.40865 13.4086 9.5816 13.5816 9.78343 13.7053C9.96237 13.8149 10.1575 13.8957 10.3615 13.9447C10.5917 14 10.8363 14 11.3255 14H12.6745C13.1637 14 13.4083 14 13.6385 13.9447C13.8425 13.8957 14.0376 13.8149 14.2166 13.7053C14.4184 13.5816 14.5914 13.4086 14.9373 13.0627L15.0627 12.9373C15.4086 12.5914 15.5816 12.4184 15.7834 12.2947C15.9624 12.1851 16.1575 12.1043 16.3615 12.0553C16.5917 12 16.8363 12 17.3255 12H21M3 12L5.32639 6.83025C5.78752 5.8055 6.0181 5.29312 6.38026 4.91755C6.70041 4.58556 7.09278 4.33186 7.52691 4.17615C8.01802 4 8.57988 4 9.70361 4H14.2964C15.4201 4 15.982 4 16.4731 4.17615C16.9072 4.33186 17.2996 4.58556 17.6197 4.91755C17.9819 5.29312 18.2125 5.8055 18.6736 6.83025L21 12\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </g></svg>','Non quo aperiam repellendus quas est est. Eos aut dolore aut ut sit nesciunt. Ex tempora quia. Sit nobis consequatur dolores incidunt.',1,'/'),(4,'Manage team members','Communication','<svg height=\"200px\" width=\"200px\" version=\"1.1\" id=\"_x32_\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" viewBox=\"0 0 512 512\" xml:space=\"preserve\" fill=\"#000000\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <style type=\"text/css\"> .st0{fill:#ffffff;} </style> <g> <path class=\"st0\" d=\"M435.95,287.525c32.51,0,58.87-26.343,58.87-58.853c0-32.51-26.361-58.871-58.87-58.871 c-32.502,0-58.863,26.361-58.863,58.871C377.088,261.182,403.448,287.525,435.95,287.525z\"></path> <path class=\"st0\" d=\"M511.327,344.251c-2.623-15.762-15.652-37.822-25.514-47.677c-1.299-1.306-7.105-1.608-8.673-0.636 c-11.99,7.374-26.074,11.714-41.19,11.714c-15.099,0-29.184-4.34-41.175-11.714c-1.575-0.972-7.373-0.67-8.672,0.636 c-2.757,2.757-5.765,6.427-8.698,10.683c7.935,14.94,14.228,30.81,16.499,44.476c2.27,13.7,1.533,26.67-2.138,38.494 c13.038,4.717,28.673,6.787,44.183,6.787C476.404,397.014,517.804,382.987,511.327,344.251z\"></path> <path class=\"st0\" d=\"M254.487,262.691c52.687,0,95.403-42.716,95.403-95.402c0-52.67-42.716-95.386-95.403-95.386 c-52.678,0-95.378,42.716-95.378,95.386C159.109,219.975,201.808,262.691,254.487,262.691z\"></path> <path class=\"st0\" d=\"M335.269,277.303c-2.07-2.061-11.471-2.588-14.027-1.006c-19.448,11.966-42.271,18.971-66.755,18.971 c-24.466,0-47.3-7.005-66.738-18.971c-2.555-1.583-11.956-1.055-14.026,1.006c-16.021,16.004-37.136,51.782-41.384,77.288 c-10.474,62.826,56.634,85.508,122.148,85.508c65.532,0,132.639-22.682,122.165-85.508 C372.404,329.085,351.289,293.307,335.269,277.303z\"></path> <path class=\"st0\" d=\"M76.049,287.525c32.502,0,58.862-26.343,58.862-58.853c0-32.51-26.36-58.871-58.862-58.871 c-32.511,0-58.871,26.361-58.871,58.871C17.178,261.182,43.538,287.525,76.049,287.525z\"></path> <path class=\"st0\" d=\"M115.094,351.733c2.414-14.353,9.225-31.253,17.764-46.88c-2.38-3.251-4.759-6.083-6.955-8.279 c-1.299-1.306-7.097-1.608-8.672-0.636c-11.991,7.374-26.076,11.714-41.182,11.714c-15.108,0-29.202-4.34-41.183-11.714 c-1.568-0.972-7.382-0.67-8.681,0.636c-9.887,9.854-22.882,31.915-25.514,47.677c-6.468,38.736,34.924,52.762,75.378,52.762 c14.437,0,29.016-1.777,41.459-5.84C113.587,379.108,112.757,365.835,115.094,351.733z\"></path> </g> </g></svg>','Vero eum voluptatem aliquid nostrum voluptatem. Vitae esse natus. Earum nihil deserunt eos quasi cupiditate. A inventore et molestiae natus.',1,'/'),(5,'Spam report','Security','<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <path d=\"M12 10V13\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\"></path> <path d=\"M12 16V15.9888\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\"></path> <path d=\"M10.2518 5.147L3.6508 17.0287C2.91021 18.3618 3.87415 20 5.39912 20H18.6011C20.126 20 21.09 18.3618 20.3494 17.0287L13.7484 5.147C12.9864 3.77538 11.0138 3.77538 10.2518 5.147Z\" stroke=\"#ffffff\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></path> </g></svg>','Et quod quaerat dolorem quaerat architecto aliquam accusantium. Ex adipisci et doloremque autem quia quam. Quis eos molestiae at iure impedit.',1,'/');
/*!40000 ALTER TABLE `service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `service_category`
--

DROP TABLE IF EXISTS `service_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `service_category` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CATEGORY_NAME` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_service_category_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `service_category`
--

LOCK TABLES `service_category` WRITE;
/*!40000 ALTER TABLE `service_category` DISABLE KEYS */;
INSERT INTO `service_category` VALUES (4,'Communication'),(5,'Security'),(6,'Performance');
/*!40000 ALTER TABLE `service_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `social_media`
--

DROP TABLE IF EXISTS `social_media`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `social_media` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `MEDIA_NAME` varchar(255) NOT NULL,
  `SVG_ICON` text NOT NULL,
  `LINK` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_social_media_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `social_media`
--

LOCK TABLES `social_media` WRITE;
/*!40000 ALTER TABLE `social_media` DISABLE KEYS */;
INSERT INTO `social_media` VALUES (13,'Facebook','<svg fill=\"#ffffff\" viewBox=\"0 0 32 32\" xmlns=\"http://www.w3.org/2000/svg\" stroke=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"><path d=\"M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z\"></path></g></svg>','www.linkedin.com/in/babu-reddy-s-4264971a4'),(14,'twitter','<svg viewBox=\"0 -2 20 20\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" fill=\"#ffffff\" stroke=\"#ffffff\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <title>twitter [#ffffff]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id=\"Page-1\" stroke=\"none\" stroke-width=\"1\" fill=\"none\" fill-rule=\"evenodd\"> <g id=\"Dribbble-Light-Preview\" transform=\"translate(-60.000000, -7521.000000)\" fill=\"#ffffff\"> <g id=\"icons\" transform=\"translate(56.000000, 160.000000)\"> <path d=\"M10.29,7377 C17.837,7377 21.965,7370.84365 21.965,7365.50546 C21.965,7365.33021 21.965,7365.15595 21.953,7364.98267 C22.756,7364.41163 23.449,7363.70276 24,7362.8915 C23.252,7363.21837 22.457,7363.433 21.644,7363.52751 C22.5,7363.02244 23.141,7362.2289 23.448,7361.2926 C22.642,7361.76321 21.761,7362.095 20.842,7362.27321 C19.288,7360.64674 16.689,7360.56798 15.036,7362.09796 C13.971,7363.08447 13.518,7364.55538 13.849,7365.95835 C10.55,7365.79492 7.476,7364.261 5.392,7361.73762 C4.303,7363.58363 4.86,7365.94457 6.663,7367.12996 C6.01,7367.11125 5.371,7366.93797 4.8,7366.62489 L4.8,7366.67608 C4.801,7368.5989 6.178,7370.2549 8.092,7370.63591 C7.488,7370.79836 6.854,7370.82199 6.24,7370.70483 C6.777,7372.35099 8.318,7373.47829 10.073,7373.51078 C8.62,7374.63513 6.825,7375.24554 4.977,7375.24358 C4.651,7375.24259 4.325,7375.22388 4,7375.18549 C5.877,7376.37088 8.06,7377 10.29,7376.99705\" id=\"twitter-[#ffffff]\"> </path> </g> </g> </g> </g></svg>','www.linkedin.com/in/babu-reddy-s-4264971a4'),(15,'github','<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <path d=\"M4.0744 2.9938C4.13263 1.96371 4.37869 1.51577 5.08432 1.15606C5.84357 0.768899 7.04106 0.949072 8.45014 1.66261C9.05706 1.97009 9.11886 1.97635 10.1825 1.83998C11.5963 1.65865 13.4164 1.65929 14.7213 1.84164C15.7081 1.97954 15.7729 1.97265 16.3813 1.66453C18.3814 0.651679 19.9605 0.71795 20.5323 1.8387C20.8177 2.39812 20.8707 3.84971 20.6494 5.04695C20.5267 5.71069 20.5397 5.79356 20.8353 6.22912C22.915 9.29385 21.4165 14.2616 17.8528 16.1155C17.5801 16.2574 17.3503 16.3452 17.163 16.4167C16.5879 16.6363 16.4133 16.703 16.6247 17.7138C16.7265 18.2 16.8491 19.4088 16.8973 20.4002C16.9844 22.1922 16.9831 22.2047 16.6688 22.5703C16.241 23.0676 15.6244 23.076 15.2066 22.5902C14.9341 22.2734 14.9075 22.1238 14.9075 20.9015C14.9075 19.0952 14.7095 17.8946 14.2417 16.8658C13.6854 15.6415 14.0978 15.185 15.37 14.9114C17.1383 14.531 18.5194 13.4397 19.2892 11.8146C20.0211 10.2698 20.1314 8.13501 18.8082 6.83668C18.4319 6.3895 18.4057 5.98446 18.6744 4.76309C18.7748 4.3066 18.859 3.71768 18.8615 3.45425C18.8653 3.03823 18.8274 2.97541 18.5719 2.97541C18.4102 2.97541 17.7924 3.21062 17.1992 3.49805L16.2524 3.95695C16.1663 3.99866 16.07 4.0147 15.975 4.0038C13.5675 3.72746 11.2799 3.72319 8.86062 4.00488C8.76526 4.01598 8.66853 3.99994 8.58215 3.95802L7.63585 3.49882C7.04259 3.21087 6.42482 2.97541 6.26317 2.97541C5.88941 2.97541 5.88379 3.25135 6.22447 4.89078C6.43258 5.89203 6.57262 6.11513 5.97101 6.91572C5.06925 8.11576 4.844 9.60592 5.32757 11.1716C5.93704 13.1446 7.4295 14.4775 9.52773 14.9222C10.7926 15.1903 11.1232 15.5401 10.6402 16.9905C10.26 18.1319 10.0196 18.4261 9.46707 18.4261C8.72365 18.4261 8.25796 17.7821 8.51424 17.1082C8.62712 16.8112 8.59354 16.7795 7.89711 16.5255C5.77117 15.7504 4.14514 14.0131 3.40172 11.7223C2.82711 9.95184 3.07994 7.64739 4.00175 6.25453C4.31561 5.78028 4.32047 5.74006 4.174 4.83217C4.09113 4.31822 4.04631 3.49103 4.0744 2.9938Z\" fill=\"#ffffff\"></path> <path d=\"M3.33203 15.9454C3.02568 15.4859 2.40481 15.3617 1.94528 15.6681C1.48576 15.9744 1.36158 16.5953 1.66793 17.0548C1.8941 17.3941 2.16467 17.6728 2.39444 17.9025C2.4368 17.9449 2.47796 17.9858 2.51815 18.0257C2.71062 18.2169 2.88056 18.3857 3.05124 18.5861C3.42875 19.0292 3.80536 19.626 4.0194 20.6962C4.11474 21.1729 4.45739 21.4297 4.64725 21.5419C4.85315 21.6635 5.07812 21.7352 5.26325 21.7819C5.64196 21.8774 6.10169 21.927 6.53799 21.9559C7.01695 21.9877 7.53592 21.998 7.99999 22.0008C8.00033 22.5527 8.44791 23.0001 8.99998 23.0001C9.55227 23.0001 9.99998 22.5524 9.99998 22.0001V21.0001C9.99998 20.4478 9.55227 20.0001 8.99998 20.0001C8.90571 20.0001 8.80372 20.0004 8.69569 20.0008C8.10883 20.0026 7.34388 20.0049 6.67018 19.9603C6.34531 19.9388 6.07825 19.9083 5.88241 19.871C5.58083 18.6871 5.09362 17.8994 4.57373 17.2891C4.34391 17.0194 4.10593 16.7834 3.91236 16.5914C3.87612 16.5555 3.84144 16.5211 3.80865 16.4883C3.5853 16.265 3.4392 16.1062 3.33203 15.9454Z\" fill=\"#ffffff\"></path> </g></svg>','www.linkedin.com/in/babu-reddy-s-4264971a4'),(16,'youtube','<svg viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><g id=\"SVGRepo_bgCarrier\" stroke-width=\"0\"></g><g id=\"SVGRepo_tracerCarrier\" stroke-linecap=\"round\" stroke-linejoin=\"round\"></g><g id=\"SVGRepo_iconCarrier\"> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M9.49614 7.13176C9.18664 6.9549 8.80639 6.95617 8.49807 7.13509C8.18976 7.31401 8 7.64353 8 8V16C8 16.3565 8.18976 16.686 8.49807 16.8649C8.80639 17.0438 9.18664 17.0451 9.49614 16.8682L16.4961 12.8682C16.8077 12.6902 17 12.3589 17 12C17 11.6411 16.8077 11.3098 16.4961 11.1318L9.49614 7.13176ZM13.9844 12L10 14.2768V9.72318L13.9844 12Z\" fill=\"#ffffff\"></path> <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M0 12C0 8.25027 0 6.3754 0.954915 5.06107C1.26331 4.6366 1.6366 4.26331 2.06107 3.95491C3.3754 3 5.25027 3 9 3H15C18.7497 3 20.6246 3 21.9389 3.95491C22.3634 4.26331 22.7367 4.6366 23.0451 5.06107C24 6.3754 24 8.25027 24 12C24 15.7497 24 17.6246 23.0451 18.9389C22.7367 19.3634 22.3634 19.7367 21.9389 20.0451C20.6246 21 18.7497 21 15 21H9C5.25027 21 3.3754 21 2.06107 20.0451C1.6366 19.7367 1.26331 19.3634 0.954915 18.9389C0 17.6246 0 15.7497 0 12ZM9 5H15C16.9194 5 18.1983 5.00275 19.1673 5.10773C20.0989 5.20866 20.504 5.38448 20.7634 5.57295C21.018 5.75799 21.242 5.98196 21.4271 6.23664C21.6155 6.49605 21.7913 6.90113 21.8923 7.83269C21.9973 8.80167 22 10.0806 22 12C22 13.9194 21.9973 15.1983 21.8923 16.1673C21.7913 17.0989 21.6155 17.504 21.4271 17.7634C21.242 18.018 21.018 18.242 20.7634 18.4271C20.504 18.6155 20.0989 18.7913 19.1673 18.8923C18.1983 18.9973 16.9194 19 15 19H9C7.08058 19 5.80167 18.9973 4.83269 18.8923C3.90113 18.7913 3.49605 18.6155 3.23664 18.4271C2.98196 18.242 2.75799 18.018 2.57295 17.7634C2.38448 17.504 2.20866 17.0989 2.10773 16.1673C2.00275 15.1983 2 13.9194 2 12C2 10.0806 2.00275 8.80167 2.10773 7.83269C2.20866 6.90113 2.38448 6.49605 2.57295 6.23664C2.75799 5.98196 2.98196 5.75799 3.23664 5.57295C3.49605 5.38448 3.90113 5.20866 4.83269 5.10773C5.80167 5.00275 7.08058 5 9 5Z\" fill=\"#ffffff\"></path> </g></svg>','www.linkedin.com/in/babu-reddy-s-4264971a4');
/*!40000 ALTER TABLE `social_media` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subscribers`
--

DROP TABLE IF EXISTS `subscribers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `subscribers` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_subscribers_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subscribers`
--

LOCK TABLES `subscribers` WRITE;
/*!40000 ALTER TABLE `subscribers` DISABLE KEYS */;
INSERT INTO `subscribers` VALUES (1,'babureddys@gmail.com'),(2,'testing@gmail.com'),(3,'deom@gmail.com'),(4,'demotesting@gmail.com'),(5,'demo@gmail.com'),(6,'demo@gmail.com'),(7,'demoW@gmail.com'),(8,'demoW@gmail.com'),(9,'demoW@gmail.com'),(10,'demoW@gmail.com'),(11,'demoW@gmail.com'),(12,'demoW@gmail.com'),(13,'demoW@gmail.com'),(14,'demoW@gmail.com'),(15,'demoW@gmail.com'),(16,'demoW@gmail.com'),(17,'demoW@gmail.com'),(18,'demoW@gmail.com'),(19,'demoW@gmail.com'),(20,'demoW@gmail.com'),(21,'demoW@gmail.com'),(22,'demoW@gmail.com'),(23,'babu@gmail.com'),(24,'bau@gmail.com'),(25,'babu@gmail.com'),(26,'babu@gmail.com'),(27,'babu@gmail.com'),(28,'babu@gmail.com'),(29,'babu@gmail.com'),(30,'babu@gmail.com'),(31,'arjun@gmail.com'),(32,'gmail@gmail.com'),(33,'demo@gmail.com');
/*!40000 ALTER TABLE `subscribers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `team`
--

DROP TABLE IF EXISTS `team`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `team` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `EMPLOYEE_NAME` varchar(255) NOT NULL,
  `DESIGNATION` varchar(255) NOT NULL,
  `LINKEDIN_PROFILE` varchar(255) DEFAULT NULL,
  `TWITTER_PROFILE` varchar(255) DEFAULT NULL,
  `PHOTO_PATH` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_team_ID` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `team`
--

LOCK TABLES `team` WRITE;
/*!40000 ALTER TABLE `team` DISABLE KEYS */;
INSERT INTO `team` VALUES (5,'Babu Reddy S','Senior Designer','www.linkedin.com/in/ babu-reddy-s-4264971a4','www.linkedin.com/in/ babu-reddy-s-4264971a4','/team_member_5.png'),(6,'Floyd Miles','Principal Designer','www.linkedin.com/in/ babu-reddy-s-4264971a4','www.linkedin.com/in/ babu-reddy-s-4264971a4','/team_member_6.png'),(7,'Emily Selman','VP, User Experience','www.linkedin.com/in/ babu-reddy-s-4264971a4','www.linkedin.com/in/ babu-reddy-s-4264971a4','/team_member_7.png'),(8,'Kristin Watson','VP, Human Resources','www.linkedin.com/in/ babu-reddy-s-4264971a4','www.linkedin.com/in/ babu-reddy-s-4264971a4','/team_member_8.png'),(9,'Emma Dorsey','Senior Developer','www.linkedin.com/in/ babu-reddy-s-4264971a4','www.linkedin.com/in/ babu-reddy-s-4264971a4','/team_member_9.png'),(11,'Abhi','CEO','/','/','/team_member_11.png');
/*!40000 ALTER TABLE `team` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `PERSON_NAME` varchar(255) DEFAULT NULL,
  `DESIGNATION` varchar(255) DEFAULT NULL,
  `PERSON_PHOTO` varchar(255) DEFAULT NULL,
  `REVIEW` text,
  PRIMARY KEY (`ID`),
  KEY `ix_testimonials_ID` (`ID`),
  KEY `ix_testimonials_PERSON_NAME` (`PERSON_NAME`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
INSERT INTO `testimonials` VALUES (6,'Sheryl Berge','CEO at Lynch LLC','/testimonial_6.png','TaxPal is so easy to use I can\'t help but wonder if it\'s really doing the things the government expects me to do.'),(7,'Leland Kiehn','Founder of Kiehn and Sons','/testimonial_7.png','The best part about TaxPal is every time I pay my employees, my bank balance doesn\'t go down like it used to. Looking forward to spending this extra cash when I figure out why my card is being declined.'),(8,'Erin Powlowski','COO at Armstrong Inc','/testimonial_8.png','There are so many things I had to do with my old software that I just don\'t do at all with TaxPal. Suspicious but I can\'t say I don\'t love it.'),(9,'Peter Renolds','Founder of West Inc','/testimonial_9.png','I used to have to remit tax to the EU and with TaxPal I somehow don\'t have to do that anymore. Nervous to travel there now though.'),(10,'Amy Hahn','Director at Velocity Industries','/testimonial_10.png','I\'m trying to get a hold of someone in support, I\'m in a lot of trouble right now and they are saying it has something to do with my books. Please get back to me right away.'),(11,'Amy Hahn','Director at Velocity Industries','/testimonial_11.png','This is the fourth email I\'ve sent to your support team. I am literally being held in jail for tax fraud. Please answer your damn emails, this is important.');
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `USER_ID` int NOT NULL AUTO_INCREMENT,
  `USER_NAME` varchar(255) NOT NULL,
  `PASSWORD` varchar(255) NOT NULL,
  `ROLE` varchar(50) NOT NULL,
  PRIMARY KEY (`USER_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin23','$2b$12$XXK.dNWUIdFyELn8ZJP28uJHFgQ8C.YUJ4Y2PzYf.8bJ8lmKckfLi','admin'),(2,'admin2','$2b$12$MGDmeZh7Cn0Gxal/TMELf.vR9mWRP9bfO6agFg.u.fLFf6QJ76C9m','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `why_choose_us`
--

DROP TABLE IF EXISTS `why_choose_us`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `why_choose_us` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `HEADER` varchar(255) DEFAULT NULL,
  `EXPLANATION` text,
  `IMAGE` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `ix_why_choose_us_ID` (`ID`),
  KEY `ix_why_choose_us_HEADER` (`HEADER`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `why_choose_us`
--

LOCK TABLES `why_choose_us` WRITE;
/*!40000 ALTER TABLE `why_choose_us` DISABLE KEYS */;
INSERT INTO `why_choose_us` VALUES (9,'Cutting-Edge Technology','We leverage the latest technologies to deliver state-of-the-art solutions that keep you ahead of the curve.','/reason_9.png'),(10,'Expert Team','Our team of seasoned professionals brings years of industry experience to tackle your most complex challenges.','/reason_10.png'),(11,'Customer-Centric Approach','We put our clients at the heart of everything we do, ensuring tailored solutions that meet your unique needs.','/reason_11.png'),(12,'Scalable Solutions','Our solutions are designed to grow with your business, providing long-term value and adaptability.','/reason_12.png'),(13,'24/7 Support','Round-the-clock support ensures that you have assistance whenever you need it, keeping your operations smooth.','/reason_13.png'),(14,'Proven Track Record','With a history of successful projects and satisfied clients, we have the experience you can trust.','/reason_14.png');
/*!40000 ALTER TABLE `why_choose_us` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-19 23:43:22
