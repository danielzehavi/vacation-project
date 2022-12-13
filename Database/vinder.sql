-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 25, 2022 at 08:05 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vinder`
--
CREATE DATABASE IF NOT EXISTS `vinder` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vinder`;

-- --------------------------------------------------------

--
-- Table structure for table `followers`
--

CREATE TABLE `followers` (
  `vacationId` int(11) NOT NULL,
  `userId` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `followers`
--

INSERT INTO `followers` (`vacationId`, `userId`) VALUES
(31, '0ea6d818-ef14-4469-a2eb-414b75bfa06c'),
(31, '22a9605c-2e67-4060-ab39-ac96d01ff771'),
(31, '406acb41-b2a4-46de-a1f9-634783888bd1'),
(31, '56631055-a144-4db4-a8d0-bd2541b9853f'),
(31, '684d54fb-bb3b-405c-bc32-3c58342ff389'),
(31, '8db32eaa-311e-4f46-8f63-01b59623fe12'),
(31, '916465f5-53cc-4a21-b027-97963c00f527'),
(31, '9475a65b-1e9c-4586-b0f1-9ef53a830976'),
(31, 'a75bd2c7-991b-4817-ba8a-063eb92c1265'),
(31, 'ddcde954-fc6a-49f3-a72e-5f0922159e3b'),
(31, 'fb7e6532-1205-4c7b-9fe2-17c863513ba9'),
(32, '406acb41-b2a4-46de-a1f9-634783888bd1'),
(32, '8db32eaa-311e-4f46-8f63-01b59623fe12'),
(32, 'a75bd2c7-991b-4817-ba8a-063eb92c1265'),
(32, 'ddcde954-fc6a-49f3-a72e-5f0922159e3b'),
(32, 'fb7e6532-1205-4c7b-9fe2-17c863513ba9'),
(33, '22a9605c-2e67-4060-ab39-ac96d01ff771'),
(33, '684d54fb-bb3b-405c-bc32-3c58342ff389'),
(33, 'c44e4eba-6a9c-4d4b-b400-704e92867ce9'),
(35, '37cc80c2-a3cd-4932-b06d-90e19daf43b7'),
(35, '56631055-a144-4db4-a8d0-bd2541b9853f'),
(35, '9475a65b-1e9c-4586-b0f1-9ef53a830976'),
(36, '0ea6d818-ef14-4469-a2eb-414b75bfa06c'),
(36, 'c44e4eba-6a9c-4d4b-b400-704e92867ce9');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` varchar(50) NOT NULL,
  `firstName` varchar(20) NOT NULL,
  `lastName` varchar(20) NOT NULL,
  `userName` varchar(20) NOT NULL,
  `password` varchar(160) NOT NULL,
  `Role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `userName`, `password`, `Role`) VALUES
('03c63729-dd4e-4bd0-a98a-d5a620df0102', 'Daniel', 'Zehavi', 'danielz', '475594658ee267ed38042cd53243a6e8870a2e3f1f68b78b537cad8cddfd6d7ba924dfd617da21f10268e3d9938b196db8c8dc1a86cc578d999f9ac7b20a7e77', 'Admin'),
('0ea6d818-ef14-4469-a2eb-414b75bfa06c', 'Sun', 'Lahmi', 'sunl', 'a128e91490793e59358cf169ea947f1cb43137ef9f18a6c764f9bbf1eaa37956a609b3d1bcaa95c81cef93c6d4cf0ae0403265046b5b1cf68281a958895bdedb', 'User'),
('22a9605c-2e67-4060-ab39-ac96d01ff771', 'Dan', 'Gold', 'dang', '9b9af53f69b3dfa6b1c5a4fd20bb94fec5245b001ae8eed021093eec360585a844eda2588fdecd8e4b48cf05b8f7bdf688b79ad7976faf95001956455d354af9', 'User'),
('37cc80c2-a3cd-4932-b06d-90e19daf43b7', 'Yotam', 'Cohen', 'yotamc', 'ecd2f1491b4504f30ec3b491c109727e2b14b5fb1490fcb79bf97e8c3bca4c8f790bb06c4c605c91b3a8ab7d17b4f681b3d3f2b93cd8d913023878ea146ef694', 'User'),
('406acb41-b2a4-46de-a1f9-634783888bd1', 'Avi', 'Ohayon', 'avi342', 'f72cfae846a66903fd4b4b85d71fed469f47f3a957b1830dfa1741c1b77eae97a968924cc09272fc03ccf21b0b6388e5af83e4338786ef469411c8c2982f9cce', 'User'),
('56631055-a144-4db4-a8d0-bd2541b9853f', 'Amit', 'Dayan', 'amitd', 'f151e12e5ffd156c42a6d3a33f39652fe7131825671ba38552cb9fd1da11651f2c4406fd19beb1c4eccec2466b3271f7c6589d6e881fcecb9fbed1d747e6a9ba', 'User'),
('684d54fb-bb3b-405c-bc32-3c58342ff389', 'Oran', 'Applebum', 'oranapple', 'fdc5339bab36af4a80d4379c5f948b85f80ac4c9570980ba6293f4529d193e07936bf099ea2cd473427df57111ecb882ed708ec89566cdccdbb4432879288e1a', 'User'),
('8db32eaa-311e-4f46-8f63-01b59623fe12', 'Liam', 'Howlet', 'liamh', '779e1a2996efc1ac6ab71624c861f16958969d8289fa8cee0d634c2acbf0f278850e83856b79206ed7ce1e0d34279b53a57e14c58081b05d298dc1a3b9bac597', 'User'),
('916465f5-53cc-4a21-b027-97963c00f527', 'Moshe', 'Cohen', 'moshec', '0ca3bc12ef6665dca1a96824e4b48422f529a31e700649ee2ac0f2a707cbf176a7f0c99cc570927a15c1a6afa83daf8ff7a8aaf526efa931da442d412003aa6a', 'User'),
('9475a65b-1e9c-4586-b0f1-9ef53a830976', 'Eyal', 'Shomri', 'eyals', 'e5b445688ad4b774c54f942f404fbe1bd2567c8b9a009d68128f718a239d1a910d04d464e9a644bdc7cc6337bd331dfd83a3b6bd869b3e02627da7a49f59c3f6', 'User'),
('a75bd2c7-991b-4817-ba8a-063eb92c1265', 'Yotam', 'Ezer', 'yotame', '14119f6ecdce5289b216daa78f33c97e1d7cdd172b9fffc5ad1323ddd0be859656a31e440dfff6ce61dc86f5295ec4b9e920be5753399c03cc7398595434eb74', 'User'),
('c44e4eba-6a9c-4d4b-b400-704e92867ce9', 'Moshe', 'Dayan', 'moshed', '55f87b83bfa44b033640795c1721aa69974a67b7d20117b1a09fa354b6870a3982889cdc09b2c04af35a0d7697dd3642db1063e8b86832f2767144573c02c189', 'User'),
('ddcde954-fc6a-49f3-a72e-5f0922159e3b', 'Tal', 'Tson', 'talson', '1f53798a13f593219fd6dc39dae6dd3a3e7441938903a0f93c312000ce53b73c37b0394f665d1d87917e447f8585f111dbb7d7943532cd18b0861b8e445efbe7', 'User'),
('fb7e6532-1205-4c7b-9fe2-17c863513ba9', 'Haim ', 'Hertzog', 'haimher', '09a3ae74e4da3a643408da714fbcbc92eb6202aa9045857ff2a0081c7837e98e4a6e231d98eb033ae099c08483d0d070be63e46b599ecee8fe8eef4e0c7d8d42', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationId` int(11) NOT NULL,
  `vacationInfo` varchar(50) NOT NULL,
  `destination` varchar(20) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `fromDate` date NOT NULL,
  `untilDate` date NOT NULL,
  `price` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationId`, `vacationInfo`, `destination`, `imageName`, `fromDate`, `untilDate`, `price`) VALUES
(31, 'Enjoy a lovely weekend at the Bahmas', 'Bahamas', 'a692e4d5-c480-4b16-ad2a-ddd04b3a6106.jpg', '2022-08-04', '2022-08-07', '250'),
(32, 'Olá! A week at Brazilian paradise awaits you!', 'Brazil', '85babc57-68f4-496a-ab2a-3abedd598ab8.jpg', '2022-08-07', '2022-08-14', '800'),
(33, 'A two weeks vacation in Mexico', 'Mexico', 'f38e5783-b3f0-4a36-beec-8bbc0b5917c0.jpg', '2022-08-03', '2022-08-17', '600'),
(34, 'A weekend in Columbian paradise', 'Columbia', '05ae4298-9a59-434c-9aad-df0b6ea94ab7.jpg', '2022-09-01', '2022-09-04', '400'),
(35, 'A romantic weekend with your spouse in Paris ', 'Paris', '1964fdc9-347d-4151-99a0-417a2b3614ac.jpg', '2022-09-08', '2022-09-11', '300'),
(36, 'A month\'s vacation in one of Thailand\'s breath tak', 'Koh Samui', '4bf6fc39-480a-43c2-9905-d3f580576d05.jpg', '2022-07-31', '2022-08-31', '1500');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `followers`
--
ALTER TABLE `followers`
  ADD PRIMARY KEY (`vacationId`,`userId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`vacationId`) REFERENCES `vacations` (`vacationId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_3` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
