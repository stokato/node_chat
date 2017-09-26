CREATE DATABASE `chat_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

CREATE TABLE `messages` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `chat_vid` varchar(10) DEFAULT NULL,
  `vid_from` varchar(10) DEFAULT NULL,
  `vid_to` varchar(10) DEFAULT NULL,
  `message_text` text,
  `message_id` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `timestamp` bigint NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8


