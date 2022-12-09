-- phpMyAdmin SQL Dump
-- version 4.9.7
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Nov 14, 2022 at 08:08 AM
-- Server version: 5.7.32
-- PHP Version: 7.4.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `IT`
--
DROP DATABASE IF EXISTS `IT`;
CREATE DATABASE IF NOT EXISTS `IT` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `IT`;

-- --------------------------------------------------------

DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int(11) NOT NULL,
  `title` varchar(100) NOT NULL,
  `authors` varchar(100) NOT NULL,
  `abstract` varchar(9000) NOT NULL,
  `link` varchar(100) ,
  `authentication_code` int(11) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
-- 

TRUNCATE TABLE `users`;

TRUNCATE TABLE `article`;


--
INSERT INTO `article` (`id`,`title`,`authors`,`abstract`,`link`,`authentication_code`) VALUES 
(1,'تقنيات الويب الدلالي و البحث في الويب','أسماء عبد الرحمن شعار','In this dissertation, we try to handle the studying of possibility of improving the
documents retrieving performance with the help of the Semantic Web technologies,
while preserving the structure of traditional index and without losing the benefits of
traditional retrieving models that are characterized by quickness but are not accurate
because they do not take the advantage of meaning. That was an aim for benefiting
from the advantages of traditional search in addition to improved Search accuracy
Depending on the semantics described within particular domain ontology.',NULL,100),
(2,'نمذجة أداء النظم الموزعة باستخدام شبكات بتري','علــي محســـن الحاتــم','Building distributed computer sytems requires accuracy in the design whichcorresponds to the basic description of the system and quarantes good
performance that achieves users requirements. Modeling techniques are efficient
in predicting performance and improving software, one of them is Petri nets which
have been one of the most common approachs, and it helps us in describing
software, temporal and recently hardware issues in a single model. This research
offers performance evaluation of Hadoop system; one of the most popular cloud
computing systems that achieves reliable storage and distributed computing
environment. In this thesis we selected three popular Petri net tools to model the
chosen system, and presented their pros and cons. We constructed four patterns,
which could be used frequently in different systems, include: timeout, Faults, fault
tolerance, and timer. We proposed an approach that would improve hierarchy
concept in Queuing Petri net Modeling Environment (QPME) tool effectively. In
the end, we will summarize this thesis and suggeste our intended future works.',NULL,101),
(3,'دراسة سرية البيانات وسالمتها في الحوسبةالسحابية وتحديتها','عمار سهيل مقصود','Cloud Computing is considered to be an instance of an advanced technology
that facilitates providing customers with divers and with dynamic computer
services and resources. Cloud Storage is considered to be one of the most
prominent structure for providing services in this domain, as it provides
institutions and individuals with a way to store/retrieve their data remotely.
Despite the benefits of cloud storage, the security risks associated with its use
have been an obstacle to its adoption as a solution for customers with
significant and with sensitive information. The issue of security in cloud storage
has had its fair share of modern studies and researches that provide a wide
range of proposed solutions to the most prominent security requirements. It is
-however- difficult to determine the efficiency of these solutions regarding the
practice and regarding users perspectives. Thus, one of the topics offered by
this research is to highlight the most important studies that address the issues
of confidentiality and integrity of cloud stored data, and then, to evaluate
these solutions based on performance, security and other criteria. Such work
will hopefully help identifying the limitations, strengths and weaknesses in
solutions offered by reviewed studies.',NULL,102);


--

INSERT INTO `users` (`ID`, `username`, `password`) VALUES
(1, 'first', 'first'),
(2, 'second', 'second'),
(3, 'third', 'third');
--

ALTER TABLE `article`
  ADD PRIMARY KEY (`id`);

--

ALTER TABLE `article`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--

ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;


