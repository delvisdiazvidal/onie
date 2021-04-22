/*
Navicat MySQL Data Transfer

Source Server         : MySQL
Source Server Version : 50726
Source Host           : localhost:3306
Source Database       : onie_database

Target Server Type    : MYSQL
Target Server Version : 50726
File Encoding         : 65001

Date: 2021-04-22 10:39:16
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `company_table`
-- ----------------------------
DROP TABLE IF EXISTS `company_table`;
CREATE TABLE `company_table` (
  `companyCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `companyREEUP` varchar(255) NOT NULL,
  `companyName` varchar(100) NOT NULL,
  `companyDir` longtext,
  `companyMunicipalite` bigint(20) unsigned NOT NULL,
  `companyProvince` bigint(20) unsigned NOT NULL,
  `companyEntity` varchar(255) NOT NULL,
  `companyFishingBrigade` varchar(255) NOT NULL,
  PRIMARY KEY (`companyCode`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of company_table
-- ----------------------------
INSERT INTO `company_table` VALUES ('1', '', '', '', '1', '1', '', '');
INSERT INTO `company_table` VALUES ('2', '', '', '', '1', '1', '', '');
INSERT INTO `company_table` VALUES ('3', '', '', '', '1', '1', '', '');
INSERT INTO `company_table` VALUES ('4', '', '', '', '1', '1', '', '');
INSERT INTO `company_table` VALUES ('5', '', '', '', '1', '1', '', '');
INSERT INTO `company_table` VALUES ('6', '745-5222', 'OPJlkaslb', 'sdvdsvvadasdv', '6', '1', 'knÑLADvbldvl-k', 'nkñsndvnds');
INSERT INTO `company_table` VALUES ('7', '745-5222', 'OPJlkaslb', 'sdvdsvvadasdv', '6', '1', 'knÑLADvbldvl-k', 'nkñsndvnds');
INSERT INTO `company_table` VALUES ('8', '745-5222', 'OPJlkaslb', 'sdvdsvvadasdv', '6', '1', 'knÑLADvbldvl-k', 'nkñsndvnds');
INSERT INTO `company_table` VALUES ('9', '2343', 'sdfsadad', 'asvasvs', '110', '10', 'asdvasv', 'asdvasv');
INSERT INTO `company_table` VALUES ('10', '77', 'Onnsdjn jkkjsd', 'jsadjvbsdjlvbds', '56', '5', 'kjbsdvkhldkz', 'hsvhads');
INSERT INTO `company_table` VALUES ('11', '77', 'Onnsdjn jkkjsd', 'jsadjvbsdjlvbds', '56', '5', 'kjbsdvkhldkz', 'hsvhads');
INSERT INTO `company_table` VALUES ('12', '7485', 'EPICAI', 'Ave 2da del Sur', '1', '7', 'EPICAI', 'No. 5');
INSERT INTO `company_table` VALUES ('13', '103-22-12', 'Cultivos Varios', 'Calle 324 entre 13 y 15', '1', '1', 'UEB Antonio Quiteras', 'Los Guayabos');
INSERT INTO `company_table` VALUES ('14', '50.20.13.20', 'CC PCC', 'carretera de camajuani no. 160', '50', '5', 'PCC', 'autoconsumo');
INSERT INTO `company_table` VALUES ('15', '203010', 'pcc', 'carretera camajuani', '81', '7', 'pcc', 'pcc');
INSERT INTO `company_table` VALUES ('16', '110.0.06228', 'empresa', 'a', '1', '12', 'ueb', 'brigada');
INSERT INTO `company_table` VALUES ('17', '110.0.06228', 'empresa', 'a', '1', '1', 'uen', 'granja');
INSERT INTO `company_table` VALUES ('18', '111.0.6228', 'ALIMATIC', 'Máximo Gómez No 11', '81', '7', 'VILLA CLARA', 'La Guapachosa');
INSERT INTO `company_table` VALUES ('22', '533543', 'sdfdsfassfd', 'sadfasdfs', '97', '9', 'asdfasdf', 'sadfsdf');

-- ----------------------------
-- Table structure for `docs_contract_table`
-- ----------------------------
DROP TABLE IF EXISTS `docs_contract_table`;
CREATE TABLE `docs_contract_table` (
  `requestCode` bigint(20) unsigned NOT NULL,
  `contractNumber` varchar(50) NOT NULL,
  `contractFile` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`requestCode`),
  CONSTRAINT `docs_contract_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_main_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of docs_contract_table
-- ----------------------------
INSERT INTO `docs_contract_table` VALUES ('1', '123', 'docs/users/8521e848-75f9-4cb5-b97e-864bf401c452.jpg');
INSERT INTO `docs_contract_table` VALUES ('2', 'ED344', 'docs/users/b0b8eec7-0a66-4b7f-a28a-d24a497619d5.pdf');
INSERT INTO `docs_contract_table` VALUES ('3', 'asdfsdf', 'docs/users/aee2b1b6-c01d-4a1d-ba71-0cbef18aa434.pdf');
INSERT INTO `docs_contract_table` VALUES ('4', '123', 'docs/users/e613c256-95e8-4522-8e20-e5f4281f8f59.jpg');
INSERT INTO `docs_contract_table` VALUES ('6', '231', 'docs/users/4261b862-5115-47c3-8574-61572512ee13.jpg');
INSERT INTO `docs_contract_table` VALUES ('7', '23', 'docs/users/549ba802-9846-463c-86b8-5a31d0baf1f0.jpg');
INSERT INTO `docs_contract_table` VALUES ('9', '11111', 'docs/users/510c305c-6541-4360-bd15-7f78e3e27af7.jpg');
INSERT INTO `docs_contract_table` VALUES ('18', '3r34f34', 'docs\\users\\b83e39f3-62ae-4584-8cab-f3e3e18ada76.pdf');
INSERT INTO `docs_contract_table` VALUES ('22', 'asdfsd', 'docs\\users\\6bb044bf-563d-44b2-81be-898f7d8fb491.png');

-- ----------------------------
-- Table structure for `docs_table`
-- ----------------------------
DROP TABLE IF EXISTS `docs_table`;
CREATE TABLE `docs_table` (
  `requestCode` bigint(20) unsigned NOT NULL,
  `notTaxDebtFile` varchar(255) NOT NULL,
  `taxAboutShipPropertyFile` varchar(255) NOT NULL,
  `certificateOfNavigabilityFile` varchar(255) NOT NULL,
  `boatRegistrationCertificateFile` varchar(255) NOT NULL,
  PRIMARY KEY (`requestCode`),
  CONSTRAINT `docs_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_main_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of docs_table
-- ----------------------------
INSERT INTO `docs_table` VALUES ('1', 'docs/users/c514858c-cd39-49a4-b625-99b382914fed.jpg', 'docs/users/14c89973-f85f-4605-b8c7-8e1c22a645a8.jpg', 'docs/users/49aad0e1-07a2-443e-ba46-352a2266be1b.jpg', 'docs/users/0c0f1634-636f-4c69-b457-696da48d500b.jpg');
INSERT INTO `docs_table` VALUES ('2', 'docs/users/df127257-3010-4131-bc43-b576f89e0fff.pdf', 'docs/users/2b66c202-3065-4962-abb1-2b324396eb18.pdf', 'docs/users/b563ae6a-6feb-4df6-bb23-dea2d9e133cd.pdf', 'docs/users/00903b67-9f37-44b3-9daa-95a346b7bcec.pdf');
INSERT INTO `docs_table` VALUES ('3', 'docs/users/2e42ea0b-6329-4a5f-85c3-13114066bac9.pdf', 'docs/users/c2b2cf8b-e0a1-4aa4-afad-87b128d987af.pdf', 'docs/users/49398fbb-39c9-48c4-bdd2-2cb4fda46b8d.pdf', 'docs/users/c6b18b0a-cd28-4574-b383-a8aba9167170.pdf');
INSERT INTO `docs_table` VALUES ('4', 'docs/users/9ec81bd2-8dbe-42bf-9b3d-9ea9149f8aa8.jpg', 'docs/users/ba28de77-4f54-4681-ae07-8213e06d9d32.jpg', 'docs/users/1ffcc5e8-6834-4a4a-b680-10e34f3a2783.jpg', 'docs/users/83bd5f99-b2da-425b-9adf-844d6e77c446.jpg');
INSERT INTO `docs_table` VALUES ('5', 'docs/users/0d8ed6e8-1860-4bc4-b602-426cafebfe8e.jpg', 'docs/users/6c917c62-ea49-4cfc-9373-65638a627dd0.jpg', 'docs/users/c7e8c4cf-7939-4123-a9cb-0b8dd51da61e.jpg', 'docs/users/91152acc-1013-4c96-8255-a3b18c50d902.jpg');
INSERT INTO `docs_table` VALUES ('6', 'docs/users/ae48f3e6-abfc-4c2f-8d1c-599235a015d4.jpg', 'docs/users/c52f17b3-ee88-49dc-9b68-5be36ee46b83.jpg', 'docs/users/41317868-7d66-4a67-bc52-ed2aa8a3b90b.jpg', 'docs/users/22f41eb5-a011-442d-b7f8-2e6e791f2fcb.jpg');
INSERT INTO `docs_table` VALUES ('7', 'docs/users/b4cd558d-bc23-4b5a-9d0b-3967b436e756.jpg', 'docs/users/ea175b1a-5dd6-4d68-a3f3-00ee16d35ede.jpg', 'docs/users/91917975-97dc-40e8-8fef-6a074c10b356.jpg', 'docs/users/33e902f6-0b6e-4fda-ba8b-cb4612fad0d7.jpg');
INSERT INTO `docs_table` VALUES ('9', 'docs/users/4d028d19-fd8a-4003-baff-3e7ac83f51c9.jpg', 'docs/users/651506c8-8784-4406-93a9-c2e9dca24b59.jpg', 'docs/users/23009e2b-5767-42e4-b3dd-942bb9f23f69.jpg', 'docs/users/900741af-b0db-4a43-8693-f24e2d278258.jpg');
INSERT INTO `docs_table` VALUES ('18', 'docs\\users\\3566c358-04e8-4063-9e20-5a2af279dd34.pdf', 'docs\\users\\24828599-5db5-4b22-8039-7fb4b4f7013a.pdf', 'docs\\users\\c3cecd67-6564-4bfa-acc2-ad45d6ce6160.pdf', 'docs\\users\\2c026dcf-48fb-47fe-8e40-a635318b694e.pdf');
INSERT INTO `docs_table` VALUES ('22', 'docs\\users\\ef32a8f3-3f9d-4381-9cf3-6f423f1428f8.png', 'docs\\users\\b8dcbe01-8218-408b-93a3-11e26f2e164f.png', 'docs\\users\\8b913249-6bf1-47fe-95ef-de03a5fe2063.png', 'docs\\users\\13ea05e2-22db-404a-852e-117bfc20b82f.png');

-- ----------------------------
-- Table structure for `fisherycraft_table`
-- ----------------------------
DROP TABLE IF EXISTS `fisherycraft_table`;
CREATE TABLE `fisherycraft_table` (
  `fisherycraftCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fisherycraftName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fisherycraftMaxCant` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fisherycraftDescription` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modiyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`fisherycraftCode`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of fisherycraft_table
-- ----------------------------
INSERT INTO `fisherycraft_table` VALUES ('1', 'Redes de Enmalle', '2 por Embarcacion', 'Longitud máxima: 150 metros cada una. Abertura de malla: 40 mm mínimo.', '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `fisherycraft_table` VALUES ('2', 'Palangres', '3 por Embarcacion', '100 anzuelos cada una.', '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `fisherycraft_table` VALUES ('3', 'Nasas', '10 por Embarcacion', 'Las dimensiones no excederán los 100 cm de largo, 40 cm de alto y 55 cm de ancho, con abertura de malla no menor de 50 mm.', '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `fisherycraft_table` VALUES ('4', 'Líneas de mano', '2 por Pescador', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');

-- ----------------------------
-- Table structure for `fishery_table`
-- ----------------------------
DROP TABLE IF EXISTS `fishery_table`;
CREATE TABLE `fishery_table` (
  `fisheryCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `fisheryName` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fisheryAmount` double NOT NULL,
  `fisheryClasif` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`fisheryCode`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of fishery_table
-- ----------------------------
INSERT INTO `fishery_table` VALUES ('1', 'Embarcaciones de motor ', '100', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('2', 'Embarcaciones de remo o vela ', '50', null, '2021-01-30 13:07:00', '2021-02-15 20:20:22');
INSERT INTO `fishery_table` VALUES ('3', 'Pesca de langosta', '400', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('4', 'Pesca de camarón', '350', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('5', 'Pesca de bonito y otros atunes', '300', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('6', 'Pesca de escama', '250', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('7', 'Pesca de almejas', '200', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('8', 'Pesca de ostiones', '200', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('9', 'Pesca de cobo', '300', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('10', 'Pesca de pepinos de mar', '300', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('11', 'Pesca de esponjas', '300', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('12', 'Pesca de cangrejos', '200', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('13', 'Pesca de jaiba', '200', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('14', 'Pesca de batoideos', '250', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('15', 'Pesca de tiburones', '250', null, '2021-01-30 13:07:00', '2021-01-30 13:07:44');
INSERT INTO `fishery_table` VALUES ('16', 'Pesquerías no relacionadas', '200', null, '2021-01-30 13:07:00', '2021-02-15 20:20:28');

-- ----------------------------
-- Table structure for `license_aquaculture_private_table`
-- ----------------------------
DROP TABLE IF EXISTS `license_aquaculture_private_table`;
CREATE TABLE `license_aquaculture_private_table` (
  `licenseCode` bigint(20) unsigned NOT NULL,
  `licenseContractNumber` varchar(50) NOT NULL,
  `licenseContract` varchar(255) NOT NULL,
  PRIMARY KEY (`licenseCode`),
  CONSTRAINT `license_aquaculture_private_table_ibfk_1` FOREIGN KEY (`licenseCode`) REFERENCES `license_main_table` (`licenseCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of license_aquaculture_private_table
-- ----------------------------
INSERT INTO `license_aquaculture_private_table` VALUES ('1', 'ED344', 'docs/users/b0b8eec7-0a66-4b7f-a28a-d24a497619d5.pdf');
INSERT INTO `license_aquaculture_private_table` VALUES ('12', '11111', 'docs/users/510c305c-6541-4360-bd15-7f78e3e27af7.jpg');

-- ----------------------------
-- Table structure for `license_aquaculture_state_table`
-- ----------------------------
DROP TABLE IF EXISTS `license_aquaculture_state_table`;
CREATE TABLE `license_aquaculture_state_table` (
  `licenseCode` bigint(20) unsigned NOT NULL,
  `licenseCompany` bigint(20) unsigned NOT NULL,
  `licenseIRHCertificate` varchar(255) NOT NULL,
  PRIMARY KEY (`licenseCode`),
  KEY `request_acuaculture_state_ibfk_2` (`licenseCompany`),
  CONSTRAINT `license_aquaculture_state_table_ibfk_1` FOREIGN KEY (`licenseCode`) REFERENCES `license_main_table` (`licenseCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `license_aquaculture_state_table_ibfk_2` FOREIGN KEY (`licenseCompany`) REFERENCES `company_table` (`companyCode`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of license_aquaculture_state_table
-- ----------------------------
INSERT INTO `license_aquaculture_state_table` VALUES ('2', '16', 'docs/users/56088d33-745d-4670-8b5a-005c7b934a34.jpg');

-- ----------------------------
-- Table structure for `license_fishery_table`
-- ----------------------------
DROP TABLE IF EXISTS `license_fishery_table`;
CREATE TABLE `license_fishery_table` (
  `licenseCode` bigint(20) unsigned NOT NULL,
  `fisheryCode` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`licenseCode`,`fisheryCode`),
  KEY `license_fishery_table_ibfk_2` (`fisheryCode`),
  CONSTRAINT `license_fishery_table_ibfk_1` FOREIGN KEY (`licenseCode`) REFERENCES `license_platform_table` (`licenseCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `license_fishery_table_ibfk_2` FOREIGN KEY (`fisheryCode`) REFERENCES `fishery_table` (`fisheryCode`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of license_fishery_table
-- ----------------------------
INSERT INTO `license_fishery_table` VALUES ('3', '1');
INSERT INTO `license_fishery_table` VALUES ('4', '1');
INSERT INTO `license_fishery_table` VALUES ('15', '1');
INSERT INTO `license_fishery_table` VALUES ('15', '5');
INSERT INTO `license_fishery_table` VALUES ('15', '6');
INSERT INTO `license_fishery_table` VALUES ('15', '9');
INSERT INTO `license_fishery_table` VALUES ('15', '10');
INSERT INTO `license_fishery_table` VALUES ('15', '15');

-- ----------------------------
-- Table structure for `license_main_table`
-- ----------------------------
DROP TABLE IF EXISTS `license_main_table`;
CREATE TABLE `license_main_table` (
  `licenseCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `licenseIdentificator` varchar(40) NOT NULL,
  `licenseType` bigint(20) unsigned NOT NULL,
  `licenseAmount` double unsigned NOT NULL,
  `licenseStatus` varchar(10) NOT NULL,
  `licensePerson` bigint(20) unsigned NOT NULL,
  `licenseProvince` bigint(20) unsigned NOT NULL,
  `licenseDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `licenseNotTaxDebt` varchar(255) NOT NULL,
  `licenseTaxAboutShipProperty` varchar(255) NOT NULL,
  `licenseCertificateOfNavigability` varchar(255) NOT NULL,
  `licenseBoatRegistrationCertificate` varchar(255) NOT NULL,
  `licenseInspector` bigint(20) unsigned NOT NULL,
  `licenseRequestCode` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`licenseCode`),
  KEY `request_main_table_ibfk_1` (`licensePerson`),
  KEY `request_main_table_ibfk_2` (`licenseProvince`),
  KEY `request_main_table_ibfk_3` (`licenseType`),
  KEY `licenseRequestCode` (`licenseRequestCode`),
  CONSTRAINT `license_main_table_ibfk_2` FOREIGN KEY (`licenseProvince`) REFERENCES `province_table` (`provinceCode`) ON UPDATE CASCADE,
  CONSTRAINT `license_main_table_ibfk_3` FOREIGN KEY (`licenseType`) REFERENCES `license_type_table` (`licenseTypeCode`) ON UPDATE CASCADE,
  CONSTRAINT `license_main_table_ibfk_4` FOREIGN KEY (`licenseRequestCode`) REFERENCES `request_main_table` (`requestCode`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of license_main_table
-- ----------------------------
INSERT INTO `license_main_table` VALUES ('1', '341', '1', '50', 'Aprobada', '4131', '6', '2021-02-08 12:47:49', 'docs/users/df127257-3010-4131-bc43-b576f89e0fff.pdf', 'docs/users/2b66c202-3065-4962-abb1-2b324396eb18.pdf', 'docs/users/b563ae6a-6feb-4df6-bb23-dea2d9e133cd.pdf', 'docs/users/00903b67-9f37-44b3-9daa-95a346b7bcec.pdf', '2367', '2');
INSERT INTO `license_main_table` VALUES ('2', '23', '2', '20', 'Aprobada', '4130', '12', '2021-02-08 12:51:47', 'docs/users/0d8ed6e8-1860-4bc4-b602-426cafebfe8e.jpg', 'docs/users/6c917c62-ea49-4cfc-9373-65638a627dd0.jpg', 'docs/users/c7e8c4cf-7939-4123-a9cb-0b8dd51da61e.jpg', 'docs/users/91152acc-1013-4c96-8255-a3b18c50d902.jpg', '2367', '5');
INSERT INTO `license_main_table` VALUES ('3', '24', '3', '20', 'Aprobada', '4133', '12', '2021-02-08 12:55:22', 'docs/users/ae48f3e6-abfc-4c2f-8d1c-599235a015d4.jpg', 'docs/users/c52f17b3-ee88-49dc-9b68-5be36ee46b83.jpg', 'docs/users/41317868-7d66-4a67-bc52-ed2aa8a3b90b.jpg', 'docs/users/22f41eb5-a011-442d-b7f8-2e6e791f2fcb.jpg', '2367', '6');
INSERT INTO `license_main_table` VALUES ('4', '23', '4', '23', 'Aprobada', '4135', '1', '2021-02-08 12:57:57', 'docs/users/b4cd558d-bc23-4b5a-9d0b-3967b436e756.jpg', 'docs/users/ea175b1a-5dd6-4d68-a3f3-00ee16d35ede.jpg', 'docs/users/91917975-97dc-40e8-8fef-6a074c10b356.jpg', 'docs/users/33e902f6-0b6e-4fda-ba8b-cb4612fad0d7.jpg', '2367', '7');
INSERT INTO `license_main_table` VALUES ('12', 'AF3FFQ', '1', '23423', 'Aprobada', '4138', '16', '2021-02-17 13:34:13', 'docs/users/4d028d19-fd8a-4003-baff-3e7ac83f51c9.jpg', 'docs/users/651506c8-8784-4406-93a9-c2e9dca24b59.jpg', 'docs/users/23009e2b-5767-42e4-b3dd-942bb9f23f69.jpg', 'docs/users/900741af-b0db-4a43-8693-f24e2d278258.jpg', '1666', '9');
INSERT INTO `license_main_table` VALUES ('15', 'QFASAD', '3', '23423', 'Aprobada', '4144', '11', '2021-02-17 21:13:55', 'docs\\users\\3566c358-04e8-4063-9e20-5a2af279dd34.pdf', 'docs\\users\\24828599-5db5-4b22-8039-7fb4b4f7013a.pdf', 'docs\\users\\c3cecd67-6564-4bfa-acc2-ad45d6ce6160.pdf', 'docs\\users\\2c026dcf-48fb-47fe-8e40-a635318b694e.pdf', '1666', '18');

-- ----------------------------
-- Table structure for `license_platform_state_table`
-- ----------------------------
DROP TABLE IF EXISTS `license_platform_state_table`;
CREATE TABLE `license_platform_state_table` (
  `licenseCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `licenseCompany` bigint(20) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`licenseCode`),
  KEY `license_platform_state_table_license_company_foreign` (`licenseCompany`),
  CONSTRAINT `license_platform_state_table_ibfk_2` FOREIGN KEY (`licenseCompany`) REFERENCES `company_table` (`companyCode`) ON UPDATE CASCADE,
  CONSTRAINT `license_platform_state_table_ibfk_3` FOREIGN KEY (`licenseCode`) REFERENCES `license_platform_table` (`licenseCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of license_platform_state_table
-- ----------------------------
INSERT INTO `license_platform_state_table` VALUES ('4', '17', '2021-02-08 12:57:57', '2021-02-08 12:57:57');

-- ----------------------------
-- Table structure for `license_platform_table`
-- ----------------------------
DROP TABLE IF EXISTS `license_platform_table`;
CREATE TABLE `license_platform_table` (
  `licenseCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `licenseShipCaptain` bigint(20) unsigned NOT NULL,
  `licenseFisheryCraft` bigint(20) unsigned NOT NULL,
  `fisheringAreas` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `licenseContractNumber` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `licenseContract` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`licenseCode`),
  KEY `license_platform_table_license_ship_captain_foreign` (`licenseShipCaptain`),
  KEY `license_platform_table_license_fisherycraft_foreign` (`licenseFisheryCraft`),
  CONSTRAINT `license_platform_table_ibfk_2` FOREIGN KEY (`licenseFisheryCraft`) REFERENCES `fisherycraft_table` (`fisherycraftCode`) ON UPDATE CASCADE,
  CONSTRAINT `license_platform_table_ibfk_4` FOREIGN KEY (`licenseShipCaptain`) REFERENCES `person_table` (`personCode`) ON UPDATE CASCADE,
  CONSTRAINT `license_platform_table_ibfk_5` FOREIGN KEY (`licenseCode`) REFERENCES `license_main_table` (`licenseCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of license_platform_table
-- ----------------------------
INSERT INTO `license_platform_table` VALUES ('3', '4134', '1', 'a', '231', 'docs/users/4261b862-5115-47c3-8574-61572512ee13.jpg', '2021-02-08 12:55:22', '2021-02-08 12:55:22');
INSERT INTO `license_platform_table` VALUES ('4', '4136', '1', '23', '23', 'docs/users/549ba802-9846-463c-86b8-5a31d0baf1f0.jpg', '2021-02-08 12:57:57', '2021-02-08 12:57:57');
INSERT INTO `license_platform_table` VALUES ('15', '4145', '3', '4,5,6,7,89,98', '3r34f34', 'docs\\users\\b83e39f3-62ae-4584-8cab-f3e3e18ada76.pdf', '2021-02-17 21:13:55', '2021-02-17 21:13:55');

-- ----------------------------
-- Table structure for `license_type_table`
-- ----------------------------
DROP TABLE IF EXISTS `license_type_table`;
CREATE TABLE `license_type_table` (
  `licenseTypeCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `licenseTypeThumbs` varchar(2) NOT NULL,
  `licenseTypeName` varchar(50) NOT NULL,
  PRIMARY KEY (`licenseTypeCode`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of license_type_table
-- ----------------------------
INSERT INTO `license_type_table` VALUES ('1', 'AP', 'Licencia Comercial Acuícola no Estatal');
INSERT INTO `license_type_table` VALUES ('2', 'AE', 'Licencia Comercial Acuícola Estatal');
INSERT INTO `license_type_table` VALUES ('3', 'PP', 'Licencia Comercial de Plataforma no Estatal');
INSERT INTO `license_type_table` VALUES ('4', 'PE', 'Licencia Comercial de Plataforma Estatal');

-- ----------------------------
-- Table structure for `municipalite_table`
-- ----------------------------
DROP TABLE IF EXISTS `municipalite_table`;
CREATE TABLE `municipalite_table` (
  `municipaliteCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `municipaliteName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `municipaliteProvince` bigint(20) unsigned NOT NULL,
  `municipalitePopulation` int(11) DEFAULT NULL,
  `municipaliteArea` double DEFAULT NULL,
  `municipaliteDescription` text COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`municipaliteCode`),
  KEY `municipalities_province_id_foreign` (`municipaliteProvince`),
  CONSTRAINT `municipalite_table_ibfk_1` FOREIGN KEY (`municipaliteProvince`) REFERENCES `province_table` (`provinceCode`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of municipalite_table
-- ----------------------------
INSERT INTO `municipalite_table` VALUES ('1', 'Consolación del Sur', '1', '0', '0', 'descripcion', '2021-01-26 16:17:03', '2021-01-26 16:17:03');
INSERT INTO `municipalite_table` VALUES ('2', 'Guane', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('3', 'La Palma', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('4', 'Los Palacios', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('5', 'Mantua', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('6', 'Minas de Matahambre', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('7', 'Pinar del Río', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('8', 'San Juan y Martínez', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('9', 'San Luis', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('10', 'Sandino', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('11', 'Viñales', '1', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('12', 'Alquízar', '2', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('13', 'Artemisa', '2', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('14', 'Bauta', '2', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('15', 'Caimito', '2', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('16', 'Guanajay', '2', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('17', 'Güira de Melena', '2', '0', '0', 'descripcion', '2021-01-26 16:17:04', '2021-01-26 16:17:04');
INSERT INTO `municipalite_table` VALUES ('18', 'Mariel', '2', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('19', 'San Antonio de los Baños', '2', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('20', 'Bahía Honda', '2', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('21', 'San Cristóbal', '2', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('22', 'Candelaria', '2', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('23', 'Batabanó', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('24', 'Bejucal', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('25', 'Güines', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('26', 'Jaruco', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('27', 'Madruga', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('28', 'Melena del Sur', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('29', 'Nueva Paz', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('30', 'Quivicán', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('31', 'San José de las Lajas', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('32', 'San Nicolás de Bari', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('33', 'Santa Cruz del Norte', '3', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('34', 'Arroyo Naranjo', '4', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('35', 'Boyeros', '4', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('36', 'Centro Habana', '4', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('37', 'Cerro', '4', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('38', 'Cotorro', '4', '0', '0', 'descripcion', '2021-01-26 16:17:05', '2021-01-26 16:17:05');
INSERT INTO `municipalite_table` VALUES ('39', 'Diez de Octubre', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('40', 'Guanabacoa', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('41', 'Habana del Este', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('42', 'Habana Vieja', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('43', 'La Lisa', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('44', 'Marianao', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('45', 'Playa', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('46', 'Plaza', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('47', 'Regla', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('48', 'San Miguel del Padrón', '4', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('49', 'Calimete', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('50', 'Cárdenas', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('51', 'Ciénaga de Zapata', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('52', 'Colón', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('53', 'Jagüey Grande', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('54', 'Jovellanos', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('55', 'Limonar', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('56', 'Los Arabos', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('57', 'Martí', '5', '0', '0', 'descripcion', '2021-01-26 16:17:06', '2021-01-26 16:17:06');
INSERT INTO `municipalite_table` VALUES ('58', 'Matanzas', '5', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('59', 'Pedro Betancourt', '5', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('60', 'Perico', '5', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('61', 'Unión de Reyes', '5', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('62', 'Abreus', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('63', 'Cienfuegos', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('64', 'Aguada de Pasajeros', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('65', 'Cruces', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('66', 'Cumanayagua', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('67', 'Palmira', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('68', 'Rodas', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('69', 'Santa Isabel de las Lajas', '6', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('70', 'Caibarién', '7', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('71', 'Camajuaní', '7', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('72', 'Cifuentes', '7', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('73', 'Corralillo', '7', '0', '0', 'descripcion', '2021-01-26 16:17:07', '2021-01-26 16:17:07');
INSERT INTO `municipalite_table` VALUES ('74', 'Encrucijada', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('75', 'Manicaragua', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('76', 'Placetas', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('77', 'Quemado de Güines', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('78', 'Ranchuelo', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('79', 'Remedios', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('80', 'Sagua la Grande', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('81', 'Santa Clara', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('82', 'Santo Domingo', '7', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('83', 'Cabaigúan', '8', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('84', 'Fomento', '8', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('85', 'Jatibonico', '8', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('86', 'La Sierpe', '8', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('87', 'Sancti Spíritus', '8', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('88', 'Taguasco', '8', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('89', 'Trinidad', '8', '0', '0', 'descripcion', '2021-01-26 16:17:08', '2021-01-26 16:17:08');
INSERT INTO `municipalite_table` VALUES ('90', 'Yaguajay', '8', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('91', 'Ciro Redondo', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('92', 'Baraguá', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('93', 'Bolivia', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('94', 'Chambas', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('95', 'Ciego de Ávila', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('96', 'Florencia', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('97', 'Majagua', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('98', 'Morón', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('99', 'Primero de Enero', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('100', 'Venezuela', '9', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('101', 'Camagüey', '10', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('102', 'Carlos Manuel de Céspedes', '10', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('103', 'Esmeralda', '10', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('104', 'Florida', '10', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('105', 'Guaimaro', '10', '0', '0', 'descripcion', '2021-01-26 16:17:09', '2021-01-26 16:17:09');
INSERT INTO `municipalite_table` VALUES ('106', 'Jimagüayú', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('107', 'Minas', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('108', 'Najasa', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('109', 'Nuevitas', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('110', 'Santa Cruz del Sur', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('111', 'Sibanicú', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('112', 'Sierra de Cubitas', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('113', 'Vertientes', '10', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('114', 'Amancio Rodríguez', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('115', 'Colombia', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('116', 'Jesús Menéndez', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('117', 'Jobabo', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('118', 'Las Tunas', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('119', 'Majibacoa', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('120', 'Manatí', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('121', 'Puerto Padre', '11', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('122', 'Antilla', '12', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('123', 'Báguanos', '12', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('124', 'Banes', '12', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('125', 'Cacocum', '12', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('126', 'Calixto García', '12', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('127', 'Cueto', '12', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('128', 'Frank País', '12', '0', '0', 'descripcion', '2021-01-26 16:17:10', '2021-01-26 16:17:10');
INSERT INTO `municipalite_table` VALUES ('129', 'Gibara', '12', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('130', 'Holguín', '12', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('131', 'Mayarí', '12', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('132', 'Moa', '12', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('133', 'Rafael Freyre', '12', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('134', 'Sagua de Tánamo', '12', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('135', 'Urbano Noris', '12', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('136', 'Bartolomé Masó', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('137', 'Bayamo', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('138', 'Buey Arriba', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('139', 'Campechuela', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('140', 'Cauto Cristo', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('141', 'Guisa', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('142', 'Jiguaní', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('143', 'Manzanillo', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('144', 'Media Luna', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('145', 'Niquero', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('146', 'Pilón', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('147', 'Río Cauto', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('148', 'Yara', '13', '0', '0', 'descripcion', '2021-01-26 16:17:11', '2021-01-26 16:17:11');
INSERT INTO `municipalite_table` VALUES ('149', 'Contramaestre', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('150', 'Guamá', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('151', 'Julio Antonio Mella', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('152', 'Palma Soriano', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('153', 'San Luis', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('154', 'Santiago de Cuba', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('155', 'Segundo Frente', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('156', 'Songo la Maya', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('157', 'Tercer Frente', '14', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('158', 'Baracoa', '15', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('159', 'Caimanera', '15', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('160', 'El Salvador', '15', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('161', 'Guantánamo', '15', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('162', 'Imías', '15', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('163', 'Maisí', '15', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('164', 'Manuel Tames', '15', '0', '0', 'descripcion', '2021-01-26 16:17:12', '2021-01-26 16:17:12');
INSERT INTO `municipalite_table` VALUES ('165', 'Niceto Pérez', '15', '0', '0', 'descripcion', '2021-01-26 16:17:13', '2021-01-26 16:17:13');
INSERT INTO `municipalite_table` VALUES ('166', 'San Antonio del Sur', '15', '0', '0', 'descripcion', '2021-01-26 16:17:13', '2021-01-26 16:17:13');
INSERT INTO `municipalite_table` VALUES ('167', 'Yateras', '15', '0', '0', 'descripcion', '2021-01-26 16:17:13', '2021-01-26 16:17:13');
INSERT INTO `municipalite_table` VALUES ('168', 'Isla de la Juventud', '16', '0', '0', 'descripcion', '2021-01-26 16:17:13', '2021-01-26 16:17:13');

-- ----------------------------
-- Table structure for `offense_table`
-- ----------------------------
DROP TABLE IF EXISTS `offense_table`;
CREATE TABLE `offense_table` (
  `offenseCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `offenseResolution` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `offenseArticle` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `offenseIncised` varchar(5) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`offenseCode`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of offense_table
-- ----------------------------
INSERT INTO `offense_table` VALUES ('4', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('5', '51', '51', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('6', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('7', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('8', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('9', '32', '32', '13', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('10', '32', '32', '13', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('11', '32', '32', '3A', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('12', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('13', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('14', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('15', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('16', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('17', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('18', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('19', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('20', '32', '32', '20', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('21', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('22', '32', '32', '3A', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('23', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('24', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('25', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('26', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('27', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('28', '32', '32', '16', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('29', '32', '32', '16', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('30', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('31', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('32', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('33', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('34', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('35', '32', '32', '17', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('36', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('37', '32', '32', '3A', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('38', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('39', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('40', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('41', '32', '32', '13', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('42', '32', '32', '13', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('43', '51', '51', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('44', '51', '51', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('45', '51', '51', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('46', '51', '51', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('47', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('48', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('49', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('50', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('51', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('52', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('53', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('54', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('55', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('56', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('57', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('58', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('59', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('60', '32', '32', '14', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('61', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('62', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('63', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('64', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('65', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('66', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('67', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('68', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('69', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('70', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('71', '32', '32', '7', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('72', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('73', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('74', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('75', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('76', '51', '51', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('77', '51', '51', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('78', '51', '51', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('79', '51', '51', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('80', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('81', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('82', '32', '32', '18', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('83', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('84', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('85', '32', '32', '3A', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('86', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('87', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('88', '32', '32', '3D', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('89', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('90', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('91', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('92', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('93', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('94', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('95', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('96', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('97', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('98', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('99', '32', '32', '3a', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('100', '32', '32', '3a', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('101', '32', '32', '3a', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('102', '32', '32', '15', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('103', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('104', '32', '32', '21', '2021-01-31 08:30:59', '2021-01-31 08:30:59');
INSERT INTO `offense_table` VALUES ('105', '32', '32', '1', '2021-01-31 08:30:59', '2021-01-31 08:30:59');

-- ----------------------------
-- Table structure for `penalty_table`
-- ----------------------------
DROP TABLE IF EXISTS `penalty_table`;
CREATE TABLE `penalty_table` (
  `penaltyCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `penaltyTicket` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penaltyAmount` double NOT NULL,
  `penaltyOffense` bigint(20) unsigned NOT NULL,
  `penaltyDate` date NOT NULL,
  `penaltyPersonName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penaltyPersonCI` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penaltyPersonDir` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `penaltyPersonMunicipalite` bigint(20) unsigned DEFAULT NULL,
  `penaltyPersonProvince` bigint(20) unsigned DEFAULT NULL,
  `penaltyInspector` bigint(20) unsigned NOT NULL,
  `penaltyObservations` longtext COLLATE utf8mb4_unicode_ci,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`penaltyCode`),
  KEY `penalty_table_penalty_offense_foreign` (`penaltyOffense`),
  KEY `penalty_table_penalty_inspector_foreign` (`penaltyInspector`),
  KEY `penalty_table_penalty_person_foreign` (`penaltyPersonName`(191)) USING BTREE,
  CONSTRAINT `penalty_table_ibfk_1` FOREIGN KEY (`penaltyOffense`) REFERENCES `offense_table` (`offenseCode`) ON UPDATE CASCADE,
  CONSTRAINT `penalty_table_ibfk_2` FOREIGN KEY (`penaltyInspector`) REFERENCES `person_table` (`personCode`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=123 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of penalty_table
-- ----------------------------
INSERT INTO `penalty_table` VALUES ('21', 'EH-847470', '1000', '4', '2021-07-01', 'OSVALDO CARDOSO MAQUEIRA', '71101604764', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('22', 'EH-363313', '1000', '5', '2021-04-01', 'Yusdelkis Alonso Martínez', '86050980122', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('23', 'EG-215538', '2000', '6', '2021-03-01', 'Eduardo Serrano Marín', '52065569', 'HAB', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('24', 'EF-095433', '2000', '7', '2021-04-01', 'ERNESTO SALVADOR LÓPEZ', '84250118104', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('25', 'EF-095434', '2000', '8', '2021-04-01', 'SUSANA ANA PEÑA AGUILAR', '49122703872', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('26', 'EH-544135', '2000', '9', '2021-04-01', 'Frankie Fernández Rodríguez', '78011618783', 'CFG', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('27', 'EH-544537', '2000', '10', '2021-04-01', 'Yoan González Ramírez', '85073115263', 'CFG', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('28', 'DY-480486', '5000', '11', '2021-03-01', 'Yaisel Cárdenas Aragón', '82050514645', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('29', 'EG-692068', '5000', '12', '2021-03-01', 'Osmany Reinaldo Morales Solís', '65053119241', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('30', 'EG-692069', '5000', '13', '2021-03-01', 'Tomás Alfredo Chirino Peñate', '74030329460', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('31', 'EG-692070', '5000', '14', '2021-03-01', 'Rolando Rodríguez González', '69012506100', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('32', 'EH-414680', '5000', '15', '2021-05-01', 'Yuslandis Galán Garcés', '85072925843', 'SCU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('33', 'EG-836692', '10000', '16', '2021-11-01', 'Maikel Camino Prieto', '83092011145', 'SSP', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('34', 'EG-836694', '5000', '17', '2021-11-01', 'Leo Edy Naranjo de la Coba', '99101313484', 'SSP', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('35', 'EG-836693', '5000', '18', '2021-11-01', 'Yoerky Ricardo Obregón Santo', '81112713786', 'SSP', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('36', 'EG-445928', '1000', '19', '2021-08-01', 'JULIO MARTÍNEZ ALARCÓN', '74050213663', 'MAY', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('37', 'EH-706273', '1000', '20', '2021-12-01', 'Alexander Mustelier Charón', '74052010605', 'IJU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('38', 'DY-054400', '2000', '21', '2021-09-01', 'NIOSOTY CASTELLANOS GUERRERO', '78101522559', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('39', 'EG-215568', '5000', '22', '2021-01-14', 'Yunior Héctor Masó Gevara', '78012130380', 'HAB', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:41:02');
INSERT INTO `penalty_table` VALUES ('40', 'EH-544554', '1000', '23', '2021-01-13', 'José A. Hernández Delgado', '70100303007', 'CFG', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:44:59');
INSERT INTO `penalty_table` VALUES ('41', 'ED-088035', '2000', '24', '2021-09-01', 'Humberto Cardoza Cardoza', '681003296', 'GTM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('42', 'EI-875266', '5000', '25', '2021-07-01', 'Abelardo Aldana Santos', '69092007827', 'SCU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('43', 'EG-923448', '5000', '26', '2021-11-01', 'Nadir Rabi Monzón ', '93090516260', 'CAV', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('44', 'EG-923447', '5000', '27', '2021-11-01', 'Yaisel Cutiño Hernández ', '97020914745', 'CAV', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('45', 'EF-203206', '2000', '28', '2021-07-01', 'Reinier Sánchez Mayedo', '82040823848', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('46', 'EF-203207', '2000', '29', '2021-07-01', 'Luis Ángel Vázquez Alarcón ', '91080741920', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('47', 'EH-279837', '5000', '30', '2021-09-01', 'Ramiro Álvarez Aguirre', '60031111672', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('48', 'EF-593423', '1000', '31', '2021-07-01', 'Exequiel Octavio Ramos', '93041523862', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');
INSERT INTO `penalty_table` VALUES ('49', 'BF-766055', '5000', '32', '2021-01-13', 'Juan Molina Herrera', '73011918269', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:45:27');
INSERT INTO `penalty_table` VALUES ('50', 'EH-279806', '5000', '33', '2021-01-14', 'Leonisbel Tamayo Reyes', '42581123', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:41:40');
INSERT INTO `penalty_table` VALUES ('51', 'EG-836672', '5000', '34', '2021-01-15', 'Delvis I. Pérez García', '77022714006', 'SSP', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:36:04');
INSERT INTO `penalty_table` VALUES ('52', 'ED-088036', '1000', '35', '2021-01-15', 'Pauside  Leonardo  Hernández Acosta ', '73072007827', 'GTM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:36:27');
INSERT INTO `penalty_table` VALUES ('53', 'ED-088054', '7000', '36', '2021-01-17', 'Oriannis Durand Torriente ', '90010448448', 'GTM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:33:18');
INSERT INTO `penalty_table` VALUES ('54', 'EF-472064', '6000', '37', '2021-01-16', 'VÍCTOR FERNÁNDEZ MARTÍNEZ', '82042801622', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:33:40');
INSERT INTO `penalty_table` VALUES ('55', 'EH-544538', '6000', '38', '2021-01-14', 'José R. López Curbelo ', '68080606006', 'CFG', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:04:54');
INSERT INTO `penalty_table` VALUES ('56', 'EH-544555', '6000', '39', '2021-01-14', 'Cristian Alonso Roque', '111117206', 'CFG', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:04:54');
INSERT INTO `penalty_table` VALUES ('57', 'EH-572160', '8000', '40', '2021-01-14', 'Eriberto Expósito Castillo ', '62120116569', 'CFG', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:04:54');
INSERT INTO `penalty_table` VALUES ('58', 'EG-923379', '2000', '41', '2021-01-15', 'Adonis Frómeta Peña ', '83120722909', 'CAV', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:11:32');
INSERT INTO `penalty_table` VALUES ('59', 'EG-923443', '2000', '42', '2021-01-15', 'Rovier Benítez Martínez', '74122931929', 'CAV', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:12:03');
INSERT INTO `penalty_table` VALUES ('60', 'EH-363314', '1000', '43', '2021-01-16', 'Guido Bormei Naranjo', '84082616926', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:34:05');
INSERT INTO `penalty_table` VALUES ('61', 'EH-363280', '1000', '44', '2021-01-16', 'Arnaldo Aguilera Batista', '69100310489', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:34:31');
INSERT INTO `penalty_table` VALUES ('62', 'EH-220733', '7000', '45', '2021-01-15', 'Gilberto Pérez Ramírez', '71072223001', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:06:25');
INSERT INTO `penalty_table` VALUES ('63', 'EH-220734', '2000', '46', '2021-01-15', 'Lisandro Benimelis Salermo', '72091105627', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:06:25');
INSERT INTO `penalty_table` VALUES ('64', 'EE-186663', '2000', '47', '2021-01-14', 'Yailen Jimenez Fonseca ', '96062523379', 'HAB', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:42:07');
INSERT INTO `penalty_table` VALUES ('65', 'EE-186664', '2000', '48', '2021-01-14', 'Rosa Martha Ramos Zalazar', '93051001210', 'HAB', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:42:48');
INSERT INTO `penalty_table` VALUES ('66', 'EE-186665', '2000', '49', '2021-01-14', 'Joel Alarcón Mendoza', '66051420289', 'HAB', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:43:11');
INSERT INTO `penalty_table` VALUES ('67', 'EG-215532', '2000', '50', '2021-01-15', 'Yereinys Hevia Smith', '91093026274', 'HAB', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:08:54');
INSERT INTO `penalty_table` VALUES ('68', 'EG-215533', '2000', '51', '2021-01-15', 'Maité Escobar Acosta', '74083120394', 'HAB', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:09:46');
INSERT INTO `penalty_table` VALUES ('69', 'EF-593417', '5000', '52', '2021-01-15', 'Geisel Pérez Miranda', '86103123464', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:36:47');
INSERT INTO `penalty_table` VALUES ('70', 'EF-593414', '5000', '53', '2021-01-15', 'Divel Meriño Pompa', '95083046105', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:37:14');
INSERT INTO `penalty_table` VALUES ('71', 'EF-593416', '5000', '54', '2021-01-15', 'Adrián Miranda Traba', '88031648764', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:37:40');
INSERT INTO `penalty_table` VALUES ('72', 'EF-593571', '1000', '55', '2021-01-16', 'Edilberto Hernández Brunel', '95062146893', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:10:30');
INSERT INTO `penalty_table` VALUES ('73', 'EF-593409', '1000', '56', '2021-01-16', 'Roberto García Tamayo', '86032324349', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:07:14');
INSERT INTO `penalty_table` VALUES ('74', 'EH-038184', '2000', '57', '2021-01-16', 'NORGE VÍCTOR SOLER BIDOT', '70031815963', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:35:17');
INSERT INTO `penalty_table` VALUES ('75', 'EH-038183', '1000', '58', '2021-01-15', 'DIOSBEL VALENCIA MANUAL', '76010110506', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:38:08');
INSERT INTO `penalty_table` VALUES ('76', 'DY-054391', '2000', '59', '2021-01-14', 'ALDO BONET PADRÓN', '81082415268', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:43:33');
INSERT INTO `penalty_table` VALUES ('77', 'DY-054392', '2000', '60', '2021-01-14', 'EDIAN QUEVEDO GARCÍA', '95031540284', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:44:36');
INSERT INTO `penalty_table` VALUES ('78', 'EI-617836', '1000', '61', '2021-01-15', 'Idaelio Peña García', '71102827226', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:38:30');
INSERT INTO `penalty_table` VALUES ('79', 'EI-617837', '1000', '62', '2021-01-15', 'Javier Dones Cutiño', '73073125505', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:38:53');
INSERT INTO `penalty_table` VALUES ('80', 'EI-617838', '1000', '63', '2021-01-15', 'Diosbanis Infante Hernández', '80071818507', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:39:24');
INSERT INTO `penalty_table` VALUES ('81', 'EI-617839', '1000', '64', '2021-01-18', 'Yoel Belis Moñagorris Vázquez ', '73041108022', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:12:25');
INSERT INTO `penalty_table` VALUES ('82', 'EI-617840', '1000', '65', '2021-01-18', 'Rogelio Suárez Espinosa', '64062123464', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:13:20');
INSERT INTO `penalty_table` VALUES ('83', 'EI-617841', '1000', '66', '2021-01-19', 'Ramiro Suteran Infante ', '67021722482', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:14:35');
INSERT INTO `penalty_table` VALUES ('84', 'EI-617842', '1000', '67', '2021-01-19', 'Yusbel Batista López ', '87032326201', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:10:53');
INSERT INTO `penalty_table` VALUES ('85', 'EI-618025', '1000', '68', '2021-01-19', 'Yordany Blanco López ', '85100220901', 'LTU', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:11:12');
INSERT INTO `penalty_table` VALUES ('86', 'EF-593412', '1000', '69', '2021-01-25', 'Yosbanis Alarcón La O', '78031330402', 'GRA', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:33:30');
INSERT INTO `penalty_table` VALUES ('87', 'BF-472060', '1000', '70', '2021-01-24', 'RAÚL ULLOA OLIVA', '68021504988', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:41:09');
INSERT INTO `penalty_table` VALUES ('88', 'BF-472061', '5000', '71', '2021-01-24', 'JULIO ALBERTO ACOSTA ACHANS', '1122863204', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:41:09');
INSERT INTO `penalty_table` VALUES ('89', 'EH-807471', '5000', '72', '2021-01-24', 'RAIMEL FEBLES PIÑA', '79091201345', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:41:09');
INSERT INTO `penalty_table` VALUES ('90', 'BF-472065', '1000', '73', '2021-01-27', 'JUAN CARLOS RODRÍGUEZ BLANCO', '68121209547', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:29:32');
INSERT INTO `penalty_table` VALUES ('91', 'BF-472062', '1000', '74', '2021-01-27', 'IBRAHÍN OVALLE OVALLE', '64111605826', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:30:30');
INSERT INTO `penalty_table` VALUES ('92', 'BF-472063', '1000', '75', '2021-01-27', 'JORGE ALBERTO BORREGO PIÑA', '69102105742', 'PRI', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:31:08');
INSERT INTO `penalty_table` VALUES ('93', 'EH-363315', '1000', '76', '2021-01-18', 'Asvaldo Quevedo castillo', '70062201367', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:32:34');
INSERT INTO `penalty_table` VALUES ('94', 'EH-363282', '1000', '77', '2021-01-20', 'Geodanis Solis González', '91041022628', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:07:42');
INSERT INTO `penalty_table` VALUES ('95', 'EH-363316', '1000', '78', '2021-01-21', 'Eugenio Mariño Morffi López', '93032819949', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:02:54');
INSERT INTO `penalty_table` VALUES ('96', 'EH-363317', '1000', '79', '2021-01-21', 'Armando Nogales González', '72070322484', 'HOL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:02:54');
INSERT INTO `penalty_table` VALUES ('97', 'EH-572161', '8000', '80', '2021-01-21', 'Jorge L Rodríguez Cauto', '63061704361', 'CFG', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:52:36');
INSERT INTO `penalty_table` VALUES ('98', 'EH-038291', '1000', '81', '2021-01-21', 'ARICEL GONZÁLEZ ÁLVAREZ', '73033101008', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:03:43');
INSERT INTO `penalty_table` VALUES ('99', 'EH-038173', '1000', '82', '2021-01-22', 'YURI QUINTANA QUINTERO', '85092619006', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:03:43');
INSERT INTO `penalty_table` VALUES ('100', 'EI-523226', '10000', '83', '2021-01-24', 'JORGE LUIS DÍAZ MORA', '71030519589', 'CAM', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:41:48');
INSERT INTO `penalty_table` VALUES ('101', 'EB-203981', '1000', '84', '2021-01-22', 'Carlos Javier Águila Sánchez', '91101835264', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:53:26');
INSERT INTO `penalty_table` VALUES ('102', 'EI-422501', '5000', '85', '2021-01-26', 'Yaser Cárdenas Herrera', '88111014263', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:32:04');
INSERT INTO `penalty_table` VALUES ('103', 'EG-692073', '5000', '86', '2021-01-22', 'Mariano Cortina Rojas', '65051904747', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:55:57');
INSERT INTO `penalty_table` VALUES ('104', 'EG-692075', '5000', '87', '2021-01-22', 'Arian Soto Padrón', '91061933487', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:56:22');
INSERT INTO `penalty_table` VALUES ('105', 'EG-192013', '5000', '88', '2021-01-22', 'Francisco Barrero de la Riva', '64082126967', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:56:48');
INSERT INTO `penalty_table` VALUES ('106', 'EG-192014', '5000', '89', '2021-01-22', 'Deini Amador Paz', '85100711889', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:58:19');
INSERT INTO `penalty_table` VALUES ('107', 'EG-192015', '5000', '90', '2021-01-22', 'Nelky Omar Quincose González', '89081628747', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:00:04');
INSERT INTO `penalty_table` VALUES ('108', 'EG-192016', '5000', '91', '2021-01-22', 'Yoandry Yera Hernández', '81031310889', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:00:05');
INSERT INTO `penalty_table` VALUES ('109', 'EG-692034', '5000', '92', '2021-01-22', 'Carlos Michel Morales Soliño', '78112714923', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:00:04');
INSERT INTO `penalty_table` VALUES ('110', 'EG-692035', '5000', '93', '2021-01-22', 'Osdiel Rodríguez González', '76062407006', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:00:04');
INSERT INTO `penalty_table` VALUES ('111', 'EG-692036', '5000', '94', '2021-01-22', 'Irel Pérez Lescano', '72121933942', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:00:05');
INSERT INTO `penalty_table` VALUES ('112', 'EG-692017', '5000', '95', '2021-01-23', 'Saikel Ccarlos Yanes Prieto', '96011213549', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:01:01');
INSERT INTO `penalty_table` VALUES ('113', 'EG-692018', '5000', '96', '2021-01-23', 'Yoelvis Pérez Fumero', '99120611786', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 20:01:01');
INSERT INTO `penalty_table` VALUES ('114', 'EG-692038', '5000', '97', '2021-01-23', 'Lázaro Herrera Delgado', '71012907104', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:50:13');
INSERT INTO `penalty_table` VALUES ('115', 'EG-692039', '5000', '98', '2021-01-23', 'Lisvani Quintana González', '96090513586', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 19:50:54');
INSERT INTO `penalty_table` VALUES ('116', 'EG-692033', '5000', '99', '2021-01-15', 'Alexander Parrado Luis', '74121206428', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:39:55');
INSERT INTO `penalty_table` VALUES ('117', 'EG-692071', '5000', '100', '2021-01-15', 'Alexey Acebey del Rio', '67070404209', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:40:12');
INSERT INTO `penalty_table` VALUES ('118', 'EG-692072', '5000', '101', '2021-01-15', 'Juan Vázquez García', '50112200201', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:40:41');
INSERT INTO `penalty_table` VALUES ('119', 'EG-692032', '2000', '102', '2021-01-13', 'Elier Hernández Basan', '70091223005', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:45:54');
INSERT INTO `penalty_table` VALUES ('120', 'EB-203990', '1000', '103', '2021-01-16', 'Alexander Martínez Morales', '73101516668', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:35:37');
INSERT INTO `penalty_table` VALUES ('121', 'EG-628596', '1000', '104', '2021-01-18', 'Jorge Rodríguez Rivera', '62122516286', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 22:32:56');
INSERT INTO `penalty_table` VALUES ('122', 'EG-692031', '5000', '105', '2021-09-01', 'Robexy Hernández Campillo', '89121528425', 'VCL', null, null, '1666', null, '2021-01-31 08:54:45', '2021-01-31 08:54:45');

-- ----------------------------
-- Table structure for `person_table`
-- ----------------------------
DROP TABLE IF EXISTS `person_table`;
CREATE TABLE `person_table` (
  `personCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(100) NOT NULL,
  `lastName` varchar(100) NOT NULL,
  `personCI` varchar(11) NOT NULL,
  `personDir` longtext,
  `personMunicipalite` bigint(20) unsigned NOT NULL,
  `personProvince` bigint(20) unsigned NOT NULL,
  `personEmail` varchar(100) DEFAULT NULL,
  `personPhone` varchar(20) DEFAULT NULL,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`personCode`),
  KEY `person_table_ibfk_1` (`personMunicipalite`),
  KEY `person_table_ibfk_2` (`personProvince`),
  CONSTRAINT `person_table_ibfk_2` FOREIGN KEY (`personProvince`) REFERENCES `province_table` (`provinceCode`) ON UPDATE CASCADE,
  CONSTRAINT `person_table_ibfk_3` FOREIGN KEY (`personMunicipalite`) REFERENCES `municipalite_table` (`municipaliteCode`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4154 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of person_table
-- ----------------------------
INSERT INTO `person_table` VALUES ('1666', 'Guillermo', 'Quintana', '87485962556', 'Ave. De Independencia No. 4904 e/ Callejón de la Guayaba y Calle B.', '36', '4', 'contactos@onie.cu', '52794578', '2021-03-09 18:59:34', '2021-01-10 11:34:19');
INSERT INTO `person_table` VALUES ('2367', 'Benigno', 'Pacheco Glez', '87478596523', 'Calle 12 y 3ra y 5ta Rpto Camacho', '81', '7', 'benigno.pacheco@onievc.alinet.cu', '42-206744', '2021-02-07 18:26:39', '2021-01-08 19:10:20');
INSERT INTO `person_table` VALUES ('4129', 'Charlotte', 'Díaz Rosabal', '84042407701', 'Ave 40 No. 3903 e/ 39 y 41', '63', '6', 'oniecf@enet.cu', '43-518605', '2021-02-07 18:31:13', '2021-01-08 19:10:20');
INSERT INTO `person_table` VALUES ('4130', 'yordani', 'bermudez', '85102121501', 'c', '122', '12', 'yordani.bermudez@alimatic.cu', '52855476', '2021-02-08 12:51:07', '2021-02-08 11:20:00');
INSERT INTO `person_table` VALUES ('4131', 'Pedro', 'Perez', '74859148846', 'Calle 45 no.34', '66', '6', '', '', '2021-02-08 11:23:22', '2021-02-08 11:23:22');
INSERT INTO `person_table` VALUES ('4132', 'Probando', 'kjbsfds', '68465165466', 'sadfasdfasdfasdf', '91', '9', '', '', '2021-02-08 11:28:23', '2021-02-08 11:28:23');
INSERT INTO `person_table` VALUES ('4133', 'yordani', 'bermudez', '85102121506', 'c', '122', '12', 'yordani.bermudez@alimatic.cu', '52855476', '2021-02-08 12:54:42', '2021-02-08 12:54:42');
INSERT INTO `person_table` VALUES ('4134', 'caputan', 'b', '85102121809', 'a', '1', '1', 'yordani.bermudez@alimatic.cu', '52855476', '2021-02-08 12:54:42', '2021-02-08 12:54:42');
INSERT INTO `person_table` VALUES ('4135', 'yordani', 'bermudez', '85102121589', 'c', '1', '1', 'yordani.bermudez@alimatic.cu', '52855748', '2021-02-08 12:57:21', '2021-02-08 12:57:21');
INSERT INTO `person_table` VALUES ('4136', 'yordani', 'bermudez', '88102121508', 'c', '1', '1', 'yordani.bermudez@alimatic.cu', '52855789', '2021-02-08 12:57:21', '2021-02-08 12:57:21');
INSERT INTO `person_table` VALUES ('4137', 'Armando Herminio', 'Rosabal Valdez', '29122412624', 'Colón 551 Altos entre Hospital y Alejandro Oms', '81', '7', '', '42218899', '2021-02-08 17:51:05', '2021-02-08 17:51:05');
INSERT INTO `person_table` VALUES ('4138', 'jhj', 'jhjuhj', '11111111111', 'ghghg', '168', '16', '', '', '2021-02-09 12:41:44', '2021-02-09 12:41:44');
INSERT INTO `person_table` VALUES ('4139', 'Pedro', 'Linares Kindelán', '63092502441', 'Calle 21', '168', '16', 'pedro.kindelan@onie.cu', '76389143', '2021-03-09 18:37:04', '2021-02-09 12:50:27');
INSERT INTO `person_table` VALUES ('4144', 'Odalis', 'Vidal', '60122587458', 'scscsacsdc', '119', '11', '', '8871549246', '2021-02-17 19:58:42', '2021-02-17 19:58:42');
INSERT INTO `person_table` VALUES ('4145', 'El Loco', 'Sanchez', '23525345264', 'SAaffefe', '131', '12', '', '3252345251', '2021-02-17 19:58:42', '2021-02-17 19:58:42');
INSERT INTO `person_table` VALUES ('4152', 'Oliver', 'Diaz', '68416546346', 'lksndlknfldskflk', '87', '8', '', '6456464343', '2021-03-02 14:00:15', '2021-03-02 14:00:15');
INSERT INTO `person_table` VALUES ('4153', 'Luka', 'asdfsafsad', '23524523523', 'sdagsaddgdsg', '149', '14', '', '2345235233', '2021-03-02 14:00:15', '2021-03-02 14:00:15');

-- ----------------------------
-- Table structure for `province_table`
-- ----------------------------
DROP TABLE IF EXISTS `province_table`;
CREATE TABLE `province_table` (
  `provinceCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provinceName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provinceAB` varchar(3) COLLATE utf8mb4_unicode_ci NOT NULL,
  `provinceDescription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updatedAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`provinceCode`),
  UNIQUE KEY `province_table_province_name_unique` (`provinceName`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of province_table
-- ----------------------------
INSERT INTO `province_table` VALUES ('1', 'Pinar del Rio', 'PRI', null, '2020-12-02 10:45:13', '2020-12-02 10:45:13');
INSERT INTO `province_table` VALUES ('2', 'Artemisa', 'ART', null, '2020-12-02 10:45:14', '2021-02-10 11:50:53');
INSERT INTO `province_table` VALUES ('3', 'Mayabeque', 'MAY', null, '2020-12-02 10:45:14', '2021-02-10 11:50:55');
INSERT INTO `province_table` VALUES ('4', 'La Habana', 'LHB', null, '2020-12-02 10:45:13', '2021-02-10 11:50:59');
INSERT INTO `province_table` VALUES ('5', 'Matanzas', 'MTZ', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('6', 'Cienfuegos', 'CFG', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('7', 'Villa Clara', 'VCL', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('8', 'Santi Spiritus', 'SSP', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('9', 'Ciego de Ávila', 'CAV', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('10', 'Camagüey', 'CMG', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('11', 'las Tunas', 'LTU', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('12', 'Holguín', 'HOL', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('13', 'Granma', 'GRA', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('14', 'Santiago de Cuba', 'SCU', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('15', 'Guantánamo', 'GTM', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');
INSERT INTO `province_table` VALUES ('16', 'Isla de la Juventud', 'IJV', null, '2020-12-02 10:45:14', '2020-12-02 10:45:14');

-- ----------------------------
-- Table structure for `request_aquaculture_table`
-- ----------------------------
DROP TABLE IF EXISTS `request_aquaculture_table`;
CREATE TABLE `request_aquaculture_table` (
  `requestCode` bigint(20) unsigned NOT NULL,
  `requestCompany` bigint(20) unsigned NOT NULL,
  `iRHCertificateFile` varchar(255) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`requestCode`),
  KEY `request_acuaculture_state_ibfk_2` (`requestCompany`),
  CONSTRAINT `request_aquaculture_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_main_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_aquaculture_table_ibfk_2` FOREIGN KEY (`requestCompany`) REFERENCES `company_table` (`companyCode`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of request_aquaculture_table
-- ----------------------------
INSERT INTO `request_aquaculture_table` VALUES ('5', '16', 'docs/users/56088d33-745d-4670-8b5a-005c7b934a34.jpg', '2021-02-08 12:51:07', '2021-02-08 12:51:07');

-- ----------------------------
-- Table structure for `request_fishery_table`
-- ----------------------------
DROP TABLE IF EXISTS `request_fishery_table`;
CREATE TABLE `request_fishery_table` (
  `requestCode` bigint(20) unsigned NOT NULL,
  `fisheryCode` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`requestCode`,`fisheryCode`),
  KEY `request_fishery_table_ibfk_2` (`fisheryCode`),
  CONSTRAINT `request_fishery_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_platform_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_fishery_table_ibfk_2` FOREIGN KEY (`fisheryCode`) REFERENCES `fishery_table` (`fisheryCode`) ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of request_fishery_table
-- ----------------------------
INSERT INTO `request_fishery_table` VALUES ('6', '1');
INSERT INTO `request_fishery_table` VALUES ('7', '1');
INSERT INTO `request_fishery_table` VALUES ('18', '1');
INSERT INTO `request_fishery_table` VALUES ('22', '1');
INSERT INTO `request_fishery_table` VALUES ('6', '2');
INSERT INTO `request_fishery_table` VALUES ('22', '2');
INSERT INTO `request_fishery_table` VALUES ('22', '3');
INSERT INTO `request_fishery_table` VALUES ('6', '5');
INSERT INTO `request_fishery_table` VALUES ('7', '5');
INSERT INTO `request_fishery_table` VALUES ('18', '5');
INSERT INTO `request_fishery_table` VALUES ('22', '5');
INSERT INTO `request_fishery_table` VALUES ('18', '6');
INSERT INTO `request_fishery_table` VALUES ('22', '6');
INSERT INTO `request_fishery_table` VALUES ('18', '9');
INSERT INTO `request_fishery_table` VALUES ('18', '10');
INSERT INTO `request_fishery_table` VALUES ('22', '12');
INSERT INTO `request_fishery_table` VALUES ('18', '15');

-- ----------------------------
-- Table structure for `request_main_table`
-- ----------------------------
DROP TABLE IF EXISTS `request_main_table`;
CREATE TABLE `request_main_table` (
  `requestCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `requestOrderNumber` varchar(40) NOT NULL,
  `requestType` bigint(20) unsigned NOT NULL,
  `requestPerson` bigint(20) unsigned NOT NULL,
  `requestProvince` bigint(20) unsigned NOT NULL,
  `requestDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`requestCode`),
  KEY `request_main_table_ibfk_1` (`requestPerson`),
  KEY `request_main_table_ibfk_2` (`requestProvince`),
  KEY `request_main_table_ibfk_3` (`requestType`),
  CONSTRAINT `request_main_table_ibfk_2` FOREIGN KEY (`requestProvince`) REFERENCES `province_table` (`provinceCode`) ON UPDATE CASCADE,
  CONSTRAINT `request_main_table_ibfk_3` FOREIGN KEY (`requestType`) REFERENCES `license_type_table` (`licenseTypeCode`) ON UPDATE CASCADE,
  CONSTRAINT `request_main_table_ibfk_4` FOREIGN KEY (`requestPerson`) REFERENCES `person_table` (`personCode`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of request_main_table
-- ----------------------------
INSERT INTO `request_main_table` VALUES ('1', 'APHOL1612779642025', '1', '4130', '12', '2021-02-08 11:20:00');
INSERT INTO `request_main_table` VALUES ('2', 'APCFG1612801401548', '1', '4131', '6', '2021-02-08 11:23:22');
INSERT INTO `request_main_table` VALUES ('3', 'APCAV1612801702371', '1', '4132', '9', '2021-02-08 11:28:23');
INSERT INTO `request_main_table` VALUES ('4', 'APHOL1612784391982', '1', '4130', '12', '2021-02-08 12:39:09');
INSERT INTO `request_main_table` VALUES ('5', 'AEHOL1612785109935', '2', '4130', '12', '2021-02-08 12:51:07');
INSERT INTO `request_main_table` VALUES ('6', 'PPHOL1612785325582', '3', '4133', '12', '2021-02-08 12:54:42');
INSERT INTO `request_main_table` VALUES ('7', 'PEPRI1612785483981', '4', '4135', '1', '2021-02-08 12:57:21');
INSERT INTO `request_main_table` VALUES ('9', 'APIJV1612892509773', '1', '4138', '16', '2021-02-09 12:41:44');
INSERT INTO `request_main_table` VALUES ('18', 'PPLTU1613609922429', '3', '4144', '11', '2021-02-17 19:58:42');
INSERT INTO `request_main_table` VALUES ('22', 'PESSP1614711615231', '4', '4152', '9', '2021-03-02 14:00:15');

-- ----------------------------
-- Table structure for `request_platform_state_table`
-- ----------------------------
DROP TABLE IF EXISTS `request_platform_state_table`;
CREATE TABLE `request_platform_state_table` (
  `requestCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `requestCompany` bigint(20) unsigned NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`requestCode`),
  KEY `license_platform_state_table_license_company_foreign` (`requestCompany`),
  CONSTRAINT `request_platform_state_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_platform_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_platform_state_table_ibfk_2` FOREIGN KEY (`requestCompany`) REFERENCES `company_table` (`companyCode`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of request_platform_state_table
-- ----------------------------
INSERT INTO `request_platform_state_table` VALUES ('7', '17', '2021-02-08 12:57:21', '2021-02-08 12:57:21');
INSERT INTO `request_platform_state_table` VALUES ('22', '22', '2021-03-02 14:00:15', '2021-03-02 14:00:15');

-- ----------------------------
-- Table structure for `request_platform_table`
-- ----------------------------
DROP TABLE IF EXISTS `request_platform_table`;
CREATE TABLE `request_platform_table` (
  `requestCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `requestShipCaptain` bigint(20) unsigned NOT NULL,
  `requestFisheryCraft` bigint(20) unsigned NOT NULL,
  `fisheringAreas` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`requestCode`),
  KEY `license_platform_table_license_ship_captain_foreign` (`requestShipCaptain`),
  KEY `license_platform_table_license_fisherycraft_foreign` (`requestFisheryCraft`),
  CONSTRAINT `request_platform_table_ibfk_2` FOREIGN KEY (`requestFisheryCraft`) REFERENCES `fisherycraft_table` (`fisherycraftCode`) ON UPDATE CASCADE,
  CONSTRAINT `request_platform_table_ibfk_3` FOREIGN KEY (`requestCode`) REFERENCES `request_main_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `request_platform_table_ibfk_4` FOREIGN KEY (`requestShipCaptain`) REFERENCES `person_table` (`personCode`) ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------
-- Records of request_platform_table
-- ----------------------------
INSERT INTO `request_platform_table` VALUES ('6', '4134', '1', 'a', '2021-02-08 12:54:42', '2021-02-17 19:47:35');
INSERT INTO `request_platform_table` VALUES ('7', '4136', '1', '23', '2021-02-08 12:57:21', '2021-02-17 19:47:36');
INSERT INTO `request_platform_table` VALUES ('18', '4145', '3', '4,5,6,7,89,98', '2021-02-17 19:58:42', '2021-02-17 19:58:42');
INSERT INTO `request_platform_table` VALUES ('22', '4153', '2', 'sdfssaw4q345', '2021-03-02 14:00:15', '2021-03-02 14:00:15');

-- ----------------------------
-- Table structure for `request_status_table`
-- ----------------------------
DROP TABLE IF EXISTS `request_status_table`;
CREATE TABLE `request_status_table` (
  `requestStatusCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `requestCode` bigint(20) unsigned NOT NULL,
  `requestStatusName` varchar(20) NOT NULL,
  `requestUser` bigint(20) unsigned NOT NULL,
  `requestObservation` text,
  `requestStatusDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`requestStatusCode`),
  KEY `request_status_table_ibfk_2` (`requestUser`),
  KEY `request_status_table_ibfk_1` (`requestCode`),
  CONSTRAINT `request_status_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_main_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of request_status_table
-- ----------------------------
INSERT INTO `request_status_table` VALUES ('1', '1', 'Solicitada', '4130', null, '2021-02-08 11:20:00');
INSERT INTO `request_status_table` VALUES ('2', '2', 'Solicitada', '4131', null, '2021-02-08 11:23:22');
INSERT INTO `request_status_table` VALUES ('3', '3', 'Solicitada', '4132', null, '2021-02-08 11:28:23');
INSERT INTO `request_status_table` VALUES ('4', '4', 'Solicitada', '4130', null, '2021-02-08 12:39:09');
INSERT INTO `request_status_table` VALUES ('5', '4', 'Verificada', '2367', 'ok', '2021-02-08 12:46:32');
INSERT INTO `request_status_table` VALUES ('6', '3', 'Denegada', '2367', 'a', '2021-02-08 12:46:50');
INSERT INTO `request_status_table` VALUES ('7', '2', 'Verificada', '2367', 'a', '2021-02-08 12:46:58');
INSERT INTO `request_status_table` VALUES ('8', '2', 'Aprobada', '2367', 'ok', '2021-02-08 12:47:49');
INSERT INTO `request_status_table` VALUES ('9', '5', 'Solicitada', '4130', null, '2021-02-08 12:51:07');
INSERT INTO `request_status_table` VALUES ('10', '5', 'Verificada', '2367', 'ok', '2021-02-08 12:51:38');
INSERT INTO `request_status_table` VALUES ('11', '5', 'Aprobada', '2367', 'a', '2021-02-08 12:51:47');
INSERT INTO `request_status_table` VALUES ('12', '6', 'Solicitada', '4133', null, '2021-02-08 12:54:42');
INSERT INTO `request_status_table` VALUES ('13', '6', 'Verificada', '2367', 'a', '2021-02-08 12:55:13');
INSERT INTO `request_status_table` VALUES ('14', '6', 'Aprobada', '2367', 'a', '2021-02-08 12:55:22');
INSERT INTO `request_status_table` VALUES ('15', '7', 'Solicitada', '4135', null, '2021-02-08 12:57:21');
INSERT INTO `request_status_table` VALUES ('16', '7', 'Verificada', '2367', 'a', '2021-02-08 12:57:49');
INSERT INTO `request_status_table` VALUES ('17', '7', 'Aprobada', '2367', 'a', '2021-02-08 12:57:57');
INSERT INTO `request_status_table` VALUES ('19', '9', 'Solicitada', '4138', null, '2021-02-09 12:41:44');
INSERT INTO `request_status_table` VALUES ('20', '9', 'Verificada', '1666', 'dfdfdffdf', '2021-02-09 12:44:09');
INSERT INTO `request_status_table` VALUES ('45', '9', 'Aprobada', '1666', 'ASDsadasFaf', '2021-02-17 13:34:13');
INSERT INTO `request_status_table` VALUES ('51', '18', 'Solicitada', '4144', null, '2021-02-17 19:58:42');
INSERT INTO `request_status_table` VALUES ('52', '18', 'Verificada', '1666', 'casdfsdggw', '2021-02-17 20:52:23');
INSERT INTO `request_status_table` VALUES ('56', '18', 'Aprobada', '1666', 'asfffdsafsdfadf', '2021-02-17 21:13:55');
INSERT INTO `request_status_table` VALUES ('57', '22', 'Solicitada', '4152', null, '2021-03-02 14:00:15');

-- ----------------------------
-- Table structure for `reservoir_table`
-- ----------------------------
DROP TABLE IF EXISTS `reservoir_table`;
CREATE TABLE `reservoir_table` (
  `requestCode` bigint(20) unsigned NOT NULL,
  `reservoirCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `reservoirName` varchar(255) NOT NULL,
  `reservoirSurface` int(10) unsigned NOT NULL,
  PRIMARY KEY (`reservoirCode`),
  KEY `reservoir_table_ibfk_1` (`requestCode`),
  CONSTRAINT `reservoir_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_aquaculture_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of reservoir_table
-- ----------------------------
INSERT INTO `reservoir_table` VALUES ('5', '1', 'embalse', '100');

-- ----------------------------
-- Table structure for `roles_table`
-- ----------------------------
DROP TABLE IF EXISTS `roles_table`;
CREATE TABLE `roles_table` (
  `roleCode` int(10) unsigned NOT NULL,
  `roleShort` varchar(20) NOT NULL,
  `roleName` varchar(80) NOT NULL,
  PRIMARY KEY (`roleCode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of roles_table
-- ----------------------------
INSERT INTO `roles_table` VALUES ('30', 'USER', 'Inspector Provincial');
INSERT INTO `roles_table` VALUES ('40', 'ADVANCED', 'Director Provincial');
INSERT INTO `roles_table` VALUES ('50', 'ADMIN', 'Administrador del Sistema');

-- ----------------------------
-- Table structure for `ship_table`
-- ----------------------------
DROP TABLE IF EXISTS `ship_table`;
CREATE TABLE `ship_table` (
  `requestCode` bigint(20) unsigned NOT NULL,
  `shipCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `shipName` varchar(100) NOT NULL,
  `shipRegistry` varchar(40) NOT NULL,
  `shipFolio` varchar(100) NOT NULL,
  `shipLength` double unsigned NOT NULL,
  `shipBreadth` double unsigned NOT NULL,
  `shipPort` varchar(100) DEFAULT NULL,
  `shipRegistryBrut` varchar(100) DEFAULT NULL,
  `shipEngine` varchar(100) DEFAULT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`shipCode`),
  KEY `ship_table_ibfk_1` (`requestCode`),
  CONSTRAINT `ship_table_ibfk_1` FOREIGN KEY (`requestCode`) REFERENCES `request_main_table` (`requestCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ship_table
-- ----------------------------
INSERT INTO `ship_table` VALUES ('5', '1', 'barco', '2', '3', '2', '2', null, null, null, '2021-02-08 12:51:07', '2021-02-08 12:51:07');
INSERT INTO `ship_table` VALUES ('6', '2', 'barco', '4', '02', '2', '1', '23', '2', '2500', '2021-02-08 12:54:42', '2021-02-08 12:54:42');
INSERT INTO `ship_table` VALUES ('7', '3', 'barco', '23', '23', '23', '23', '23', '23', '23', '2021-02-08 12:57:21', '2021-02-08 12:57:21');
INSERT INTO `ship_table` VALUES ('18', '5', 'la Bomba', '23', '43', '2', '43', '23', '43', '23', '2021-02-17 21:08:32', '2021-02-17 21:08:32');
INSERT INTO `ship_table` VALUES ('22', '6', 'asfdsf', 'asdfsd', 'asdf', '23', '234', 'asfsa', 'sdds', 'asdfsadf', '2021-03-02 14:00:15', '2021-03-02 14:00:15');

-- ----------------------------
-- Table structure for `user_oldpass_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_oldpass_table`;
CREATE TABLE `user_oldpass_table` (
  `oldPassCode` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `userCode` bigint(20) unsigned NOT NULL,
  `oldPassword` varchar(255) NOT NULL,
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`oldPassCode`),
  KEY `user_oldpass_table_ibfk_1` (`userCode`),
  CONSTRAINT `user_oldpass_table_ibfk_1` FOREIGN KEY (`userCode`) REFERENCES `user_table` (`userCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_oldpass_table
-- ----------------------------
INSERT INTO `user_oldpass_table` VALUES ('1', '1666', '$2a$10$bIeQ.2TSgU8/dmwRtvcJ0.OIaaekhzO5WU6RDGXVd2.r/Ei5UrXfu', '2021-02-20 10:10:00');
INSERT INTO `user_oldpass_table` VALUES ('2', '1666', '$2a$2a$10$S.Qsx33cVcPO8ANt1gkzvefTinKFC4sXDdEPbLUBH7jJuuhrQcHCG', '2021-02-20 10:11:00');
INSERT INTO `user_oldpass_table` VALUES ('3', '1666', '$2a$10$/ZUPMnn5L9p4uXSMemmZoexBITWaP67fdF/LgjZZphaLlQx/LaVtS', '2021-02-20 10:12:00');
INSERT INTO `user_oldpass_table` VALUES ('4', '1666', '$2a$10$23XCAJOvt5eFQYVF7yXeweJ7C9rKm2X3qkSvBS62CdgbvkghU8Tvm', '2021-02-20 10:13:00');
INSERT INTO `user_oldpass_table` VALUES ('5', '1666', '$2a$10$s7pcc6hoWIX7pg9rMyCjMOCM/NROIn7zs1C3Z4uIe48BzQTB/TIza', '2021-02-20 10:14:00');
INSERT INTO `user_oldpass_table` VALUES ('6', '1666', '$2a$10$PITJD2VS6RxPZqhiqCmEP.1igjZYfmbear5FhfJ7tePS8eidqyyD6', '2021-02-20 19:55:49');
INSERT INTO `user_oldpass_table` VALUES ('7', '1666', '$2a$10$uvOGIEsJkrca7mlPJ28O8O7NNmHCs78cjvWp7dAcFwneFcM0B6TuS', '2021-02-21 13:53:32');
INSERT INTO `user_oldpass_table` VALUES ('8', '4129', '$2a$10$Ec6WQQd9/yNYtJQgMrx10OoXMvFk.xB63NpyStgRwOZwIATDArLfu', '2021-02-21 13:54:12');

-- ----------------------------
-- Table structure for `user_role_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_role_table`;
CREATE TABLE `user_role_table` (
  `userCode` bigint(20) unsigned NOT NULL,
  `roleCode` int(10) unsigned NOT NULL DEFAULT '10',
  `createAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`userCode`,`roleCode`),
  KEY `user_role_table_ibfk_2` (`roleCode`),
  CONSTRAINT `user_role_table_ibfk_1` FOREIGN KEY (`roleCode`) REFERENCES `roles_table` (`roleCode`) ON UPDATE CASCADE,
  CONSTRAINT `user_role_table_ibfk_2` FOREIGN KEY (`userCode`) REFERENCES `user_table` (`userCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_role_table
-- ----------------------------
INSERT INTO `user_role_table` VALUES ('1666', '50', '2021-01-10 11:29:19');
INSERT INTO `user_role_table` VALUES ('2367', '30', '2021-01-27 01:46:02');
INSERT INTO `user_role_table` VALUES ('4129', '30', '2021-01-27 01:40:04');
INSERT INTO `user_role_table` VALUES ('4139', '30', '2021-02-09 12:50:27');

-- ----------------------------
-- Table structure for `user_table`
-- ----------------------------
DROP TABLE IF EXISTS `user_table`;
CREATE TABLE `user_table` (
  `userCode` bigint(20) unsigned NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `modifyAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `expiredAt` timestamp NOT NULL,
  `enableUser` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`userCode`),
  UNIQUE KEY `unique_username` (`username`),
  CONSTRAINT `user_table_ibfk_1` FOREIGN KEY (`userCode`) REFERENCES `person_table` (`personCode`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user_table
-- ----------------------------
INSERT INTO `user_table` VALUES ('1666', 'admin', '$2a$10$uvOGIEsJkrca7mlPJ28O8O7NNmHCs78cjvWp7dAcFwneFcM0B6TuS', '2021-02-22 13:11:23', '2021-05-22 13:53:33', '1');
INSERT INTO `user_table` VALUES ('2367', 'inspector1', '$2a$10$9GbskhdImPqqfGiyfegZEOMwbIvpy1D/NDdmc0OgR8iLLVSeffQQO', '2021-02-20 14:35:32', '2021-02-25 14:35:28', '1');
INSERT INTO `user_table` VALUES ('4129', 'inspector2', '$2a$10$Ec6WQQd9/yNYtJQgMrx10OoXMvFk.xB63NpyStgRwOZwIATDArLfu', '2021-02-22 13:15:23', '2021-05-22 13:54:12', '1');
INSERT INTO `user_table` VALUES ('4139', 'kinde', '$2a$10$BWf8pX2gdWTlIi04ZV3r7O1o4Y.06yZVyWDIJamsGcfUEzRu9078a', '2021-02-20 14:35:42', '2021-02-25 14:35:38', '1');

-- ----------------------------
-- View structure for `fishery_license_view`
-- ----------------------------
DROP VIEW IF EXISTS `fishery_license_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `fishery_license_view` AS select `license_fishery_table`.`licenseCode` AS `licenseCode`,`license_fishery_table`.`fisheryCode` AS `fisheryCode`,`fishery_table`.`fisheryName` AS `fisheryName`,`fishery_table`.`fisheryAmount` AS `fisheryAmount`,`fishery_table`.`fisheryClasif` AS `fisheryClasif`,`fishery_table`.`createdAt` AS `createdAt`,`fishery_table`.`modifyAt` AS `modifyAt` from (`license_fishery_table` join `fishery_table` on((`license_fishery_table`.`fisheryCode` = `fishery_table`.`fisheryCode`))) ;

-- ----------------------------
-- View structure for `fishery_view`
-- ----------------------------
DROP VIEW IF EXISTS `fishery_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `fishery_view` AS select `request_fishery_table`.`requestCode` AS `requestCode`,`request_fishery_table`.`fisheryCode` AS `fisheryCode`,`fishery_table`.`fisheryName` AS `fisheryName`,`fishery_table`.`fisheryAmount` AS `fisheryAmount`,`fishery_table`.`fisheryClasif` AS `fisheryClasif`,`fishery_table`.`createdAt` AS `createdAt`,`fishery_table`.`modifyAt` AS `modifyAt` from (`request_fishery_table` join `fishery_table` on((`request_fishery_table`.`fisheryCode` = `fishery_table`.`fisheryCode`))) ;

-- ----------------------------
-- View structure for `license_ship_view`
-- ----------------------------
DROP VIEW IF EXISTS `license_ship_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `license_ship_view` AS select `license_main_table`.`licenseCode` AS `licenseCode`,`license_main_table`.`licenseRequestCode` AS `licenseRequestCode`,`ship_table`.`shipCode` AS `shipCode`,`ship_table`.`shipName` AS `shipName`,`ship_table`.`shipRegistry` AS `shipRegistry`,`ship_table`.`shipFolio` AS `shipFolio`,`ship_table`.`shipLength` AS `shipLength`,`ship_table`.`shipBreadth` AS `shipBreadth`,`ship_table`.`shipPort` AS `shipPort`,`ship_table`.`shipRegistryBrut` AS `shipRegistryBrut`,`ship_table`.`shipEngine` AS `shipEngine` from (`license_main_table` join `ship_table`) where (`ship_table`.`requestCode` = `license_main_table`.`licenseRequestCode`) ;

-- ----------------------------
-- View structure for `offender_view`
-- ----------------------------
DROP VIEW IF EXISTS `offender_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `offender_view` AS select `penalty_table`.`penaltyCode` AS `penaltyCode`,`penalty_table`.`penaltyTicket` AS `penaltyTicket`,`penalty_table`.`penaltyAmount` AS `penaltyAmount`,`penalty_table`.`penaltyOffense` AS `penaltyOffense`,`offense_table`.`offenseResolution` AS `offenseResolution`,`offense_table`.`offenseArticle` AS `offenseArticle`,`offense_table`.`offenseIncised` AS `offenseIncised`,`penalty_table`.`penaltyDate` AS `penaltyDate`,`penalty_table`.`penaltyPersonName` AS `penaltyPersonName`,`penalty_table`.`penaltyPersonCI` AS `penaltyPersonCI`,`penalty_table`.`penaltyPersonDir` AS `penaltyPersonDir`,`penalty_table`.`penaltyInspector` AS `penaltyInspector`,`person_table`.`firstName` AS `firstName`,`person_table`.`lastName` AS `lastName` from (((`penalty_table` join `offense_table` on((`penalty_table`.`penaltyOffense` = `offense_table`.`offenseCode`))) join `user_table` on((`penalty_table`.`penaltyInspector` = `user_table`.`userCode`))) join `person_table` on((`user_table`.`userCode` = `person_table`.`personCode`))) ;

-- ----------------------------
-- View structure for `oldpass_view`
-- ----------------------------
DROP VIEW IF EXISTS `oldpass_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `oldpass_view` AS select `user_oldpass_table`.`oldPassCode` AS `oldPassCode`,`user_oldpass_table`.`userCode` AS `userCode`,`user_table`.`username` AS `username`,`user_oldpass_table`.`oldPassword` AS `oldPassword`,`user_oldpass_table`.`createAt` AS `createAt` from (`user_table` join `user_oldpass_table`) where (`user_oldpass_table`.`userCode` = `user_table`.`userCode`) order by `user_oldpass_table`.`createAt` desc ;

-- ----------------------------
-- View structure for `request_platfom_private_view`
-- ----------------------------
DROP VIEW IF EXISTS `request_platfom_private_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `request_platfom_private_view` AS select `request_main_table`.`requestCode` AS `requestCode`,`request_main_table`.`requestOrderNumber` AS `requestOrderNumber`,`request_main_table`.`requestType` AS `requestType`,`request_main_table`.`requestPerson` AS `requestPerson`,`request_main_table`.`requestProvince` AS `requestProvince`,`province_table`.`provinceName` AS `provinceName`,`request_main_table`.`requestDate` AS `requestDate`,`request_platform_table`.`requestShipCaptain` AS `requestShipCaptain`,`request_platform_table`.`requestFisheryCraft` AS `requestFisheryCraft`,`fisherycraft_table`.`fisherycraftName` AS `fisherycraftName`,`fisherycraft_table`.`fisherycraftMaxCant` AS `fisherycraftMaxCant`,`fisherycraft_table`.`fisherycraftDescription` AS `fisherycraftDescription` from (((`request_main_table` join `province_table` on((`request_main_table`.`requestProvince` = `province_table`.`provinceCode`))) join `request_platform_table` on((`request_platform_table`.`requestCode` = `request_main_table`.`requestCode`))) join `fisherycraft_table` on((`request_platform_table`.`requestFisheryCraft` = `fisherycraft_table`.`fisherycraftCode`))) ;

-- ----------------------------
-- View structure for `request_view`
-- ----------------------------
DROP VIEW IF EXISTS `request_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `request_view` AS select `request_main_table`.`requestCode` AS `requestCode`,`request_main_table`.`requestOrderNumber` AS `requestOrderNumber`,`request_main_table`.`requestType` AS `requestType`,`request_main_table`.`requestPerson` AS `requestPerson`,`request_main_table`.`requestProvince` AS `requestProvinceCode`,`province_table`.`provinceName` AS `requestProvince`,`request_main_table`.`requestDate` AS `requestDate` from (`request_main_table` join `province_table` on((`request_main_table`.`requestProvince` = `province_table`.`provinceCode`))) order by `request_main_table`.`requestDate` desc ;

-- ----------------------------
-- View structure for `user_view`
-- ----------------------------
DROP VIEW IF EXISTS `user_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `user_view` AS select `user_table`.`userCode` AS `userCode`,`user_table`.`username` AS `username`,`person_table`.`firstName` AS `firstName`,`person_table`.`lastName` AS `lastName`,`person_table`.`personCI` AS `personCI`,`person_table`.`personDir` AS `personDir`,`person_table`.`personMunicipalite` AS `personMunicipalite`,`municipalite_table`.`municipaliteName` AS `municipaliteName`,`person_table`.`personProvince` AS `personProvince`,`province_table`.`provinceName` AS `provinceName`,`person_table`.`personEmail` AS `personEmail`,`person_table`.`personPhone` AS `personPhone`,`roles_table`.`roleCode` AS `roleCode`,`roles_table`.`roleShort` AS `roleShort`,`roles_table`.`roleName` AS `roleName`,`person_table`.`modifyAt` AS `modifyAt`,`person_table`.`createAt` AS `createAt`,`user_table`.`expiredAt` AS `expiredAt` from (((((`person_table` join `province_table` on((`person_table`.`personProvince` = `province_table`.`provinceCode`))) join `user_table` on((`user_table`.`userCode` = `person_table`.`personCode`))) join `user_role_table` on((`user_role_table`.`userCode` = `user_table`.`userCode`))) join `roles_table` on((`user_role_table`.`roleCode` = `roles_table`.`roleCode`))) join `municipalite_table` on(((`municipalite_table`.`municipaliteProvince` = `province_table`.`provinceCode`) and (`person_table`.`personMunicipalite` = `municipalite_table`.`municipaliteCode`)))) order by `roles_table`.`roleCode` desc,`province_table`.`provinceCode` ;
