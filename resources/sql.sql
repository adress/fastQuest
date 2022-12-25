-- --------------------------------------------------------
-- Host:                         localhost
-- Server version:               8.0.31-0ubuntu0.22.04.1 - (Ubuntu)
-- Server OS:                    Linux
-- HeidiSQL Version:             12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Dumping structure for table fasquest_model.ItemMob
CREATE TABLE IF NOT EXISTS `ItemMob` (
  `itemId` int DEFAULT NULL,
  `mobId` int DEFAULT NULL,
  KEY `FK_ItemMob_items` (`itemId`),
  KEY `FK_ItemMob_mobs` (`mobId`),
  CONSTRAINT `FK_ItemMob_items` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`),
  CONSTRAINT `FK_ItemMob_mobs` FOREIGN KEY (`mobId`) REFERENCES `Mobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fasquest_model.ItemMob: ~0 rows (approximately)

-- Dumping structure for table fasquest_model.ItemQuest
CREATE TABLE IF NOT EXISTS `ItemQuest` (
  `id` int NOT NULL AUTO_INCREMENT,
  `itemId` int NOT NULL,
  `questId` int NOT NULL,
  `quantity` int NOT NULL DEFAULT '1',
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_itemQuest_quests` (`questId`),
  KEY `FK_itemQuest_items` (`itemId`),
  CONSTRAINT `FK_itemQuest_items` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`),
  CONSTRAINT `FK_itemQuest_quests` FOREIGN KEY (`questId`) REFERENCES `Quests` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=963 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fasquest_model.ItemQuest: ~0 rows (approximately)

-- Dumping structure for table fasquest_model.Items
CREATE TABLE IF NOT EXISTS `Items` (
  `id` int NOT NULL,
  `name` varchar(50) NOT NULL DEFAULT '',
  `readableName` varchar(50) NOT NULL DEFAULT '',
  `isCustom` tinyint NOT NULL DEFAULT '0',
  `questId` int DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_Items_Quests` (`questId`),
  CONSTRAINT `FK_Items_Quests` FOREIGN KEY (`questId`) REFERENCES `Quests` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fasquest_model.Items: ~0 rows (approximately)

-- Dumping structure for table fasquest_model.MapMob
CREATE TABLE IF NOT EXISTS `MapMob` (
  `mapId` int DEFAULT NULL,
  `mobId` int DEFAULT NULL,
  KEY `FK_mapMob_maps` (`mapId`),
  KEY `FK_mapMob_mobs` (`mobId`),
  CONSTRAINT `FK_mapMob_maps` FOREIGN KEY (`mapId`) REFERENCES `Maps` (`id`),
  CONSTRAINT `FK_mapMob_mobs` FOREIGN KEY (`mobId`) REFERENCES `Mobs` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fasquest_model.MapMob: ~0 rows (approximately)

-- Dumping structure for table fasquest_model.Maps
CREATE TABLE IF NOT EXISTS `Maps` (
  `id` int NOT NULL,
  `map` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fasquest_model.Maps: ~0 rows (approximately)

-- Dumping structure for table fasquest_model.Mobs
CREATE TABLE IF NOT EXISTS `Mobs` (
  `id` int NOT NULL,
  `name` int NOT NULL,
  `readableName` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fasquest_model.Mobs: ~0 rows (approximately)

-- Dumping structure for table fasquest_model.Quests
CREATE TABLE IF NOT EXISTS `Quests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `npcName` varchar(50) NOT NULL,
  `npcMap` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1065 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Dumping data for table fasquest_model.Quests: ~1 rows (approximately)
INSERT INTO `Quests` (`id`, `name`, `npcName`, `npcMap`, `createdAt`, `updatedAt`) VALUES
	(0, 'Sin Quest', 'None', 'None', NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
