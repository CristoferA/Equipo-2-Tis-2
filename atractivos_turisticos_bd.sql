-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jul 01, 2021 at 01:27 AM
-- Server version: 5.7.24
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `atractivos_turisticos_bd`
--

-- --------------------------------------------------------

--
-- Table structure for table `comentario`
--

CREATE TABLE `comentario` (
  `id_comentario` int(11) NOT NULL,
  `comentario` varchar(1024) NOT NULL,
  `id_publicacion` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `contacta`
--

CREATE TABLE `contacta` (
  `id_oferente` varchar(50) NOT NULL,
  `id_demandante` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `demandante`
--

CREATE TABLE `demandante` (
  `usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `moderador`
--

CREATE TABLE `moderador` (
  `usuario` varchar(50) NOT NULL,
  `codigo_acceso` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `moderador`
--

INSERT INTO `moderador` (`usuario`, `codigo_acceso`) VALUES
('1', '1');

-- --------------------------------------------------------

--
-- Table structure for table `oferente`
--

CREATE TABLE `oferente` (
  `usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `oferente`
--

INSERT INTO `oferente` (`usuario`) VALUES
('1');

-- --------------------------------------------------------

--
-- Table structure for table `publica`
--

CREATE TABLE `publica` (
  `id_oferente` varchar(50) NOT NULL,
  `id_publicacion` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `publica`
--

INSERT INTO `publica` (`id_oferente`, `id_publicacion`) VALUES
('1', 4);

-- --------------------------------------------------------

--
-- Table structure for table `publicacion`
--

CREATE TABLE `publicacion` (
  `id_publicacion` int(7) NOT NULL,
  `nombre_publicacion` varchar(50) NOT NULL,
  `descripcion_publicacion` varchar(3000) NOT NULL,
  `valor_publicacion` int(9) NOT NULL,
  `region_publicacion` varchar(30) NOT NULL,
  `tipo_publicacion` set('producto','servicio','infraestructura') NOT NULL,
  `estado` set('pendiente','aprobado','rechazado') NOT NULL,
  `tipo_turismo` set('negocios','urbano','natural','gastronomico','aventura','ecologico','cultural','lujo','diversion','religioso','espacial') NOT NULL,
  `email_contacto` varchar(100) NOT NULL,
  `telefono_contacto` int(12) NOT NULL,
  `direccion` varchar(100) NOT NULL,
  `redes_sociales` varchar(1000) NOT NULL,
  `comuna_publicacion` varchar(30) NOT NULL,
  `calificacion_publicacion` int(2) NOT NULL,
  `id_moderador` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `publicacion`
--

INSERT INTO `publicacion` (`id_publicacion`, `nombre_publicacion`, `descripcion_publicacion`, `valor_publicacion`, `region_publicacion`, `tipo_publicacion`, `estado`, `tipo_turismo`, `email_contacto`, `telefono_contacto`, `direccion`, `redes_sociales`, `comuna_publicacion`, `calificacion_publicacion`, `id_moderador`) VALUES
(4, 'Torres del paine', 'Estas son las torres del paine, un lugar turistico muy turistiable del sur de chile', 0, 'Magallanes y la Antartica ', 'servicio', 'aprobado', 'natural', 'paine@gmail.com', 912345678, 'Magallanes y la Antartica Chilena', 'paine', 'paine', 10, '1'),
(5, 'Ahu Tongariki', 'Este es un lugar donde se puede hacer turismo.', 0, 'Isla de pascua Valparaiso', 'servicio', 'aprobado', 'cultural', 'pascua@gmail.com', 912345678, 'rapa nui 123', 'Isla_pascua', 'Rapa nui', 10, '1');

-- --------------------------------------------------------

--
-- Table structure for table `review`
--

CREATE TABLE `review` (
  `id_review` int(11) NOT NULL,
  `review` varchar(5000) NOT NULL,
  `id_publicacion` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `id_usuario` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `email_usuario` varchar(100) NOT NULL,
  `contrasena` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`id_usuario`, `nombre_usuario`, `email_usuario`, `contrasena`) VALUES
('1', '1', '1', '1'),
('2', '2', '2', '2'),
('3', 'asdasdasdasdasd', 'asdasdasdasdsa', 'asd'),
('abismal12', 'Felipe Espinoza', 'fespinozamea@gmail.cl', 'f69be13983b69f2cafdc618f5a6ca9c5cdc4ddd28ff2b52e3116a6b907c4c614'),
('abismal13', 'Felipe Espinoza', 'fespinozameaa@gmail.cl', 'f69be13983b69f2cafdc618f5a6ca9c5cdc4ddd28ff2b52e3116a6b907c4c614'),
('abismal2', 'Felipe Espinoza', 'fespinozameeeee@gmail.cl', 'F1f1f2f3'),
('abismal20', 'Felipe Espinoza', 'fespinozameaaa@gmail.cl', 'f69be13983b69f2cafdc618f5a6ca9c5cdc4ddd28ff2b52e3116a6b907c4c614'),
('abismal3', 'Felipe Espinoza', 'fespinozameeeeee@gmail.cl', 'F1f1f2f3'),
('abismal4', 'Felipe Espinoza', 'fespinozameeeeeee@gmail.cl', 'F1f1f2f3'),
('abismal5', 'Felipe Espinoza', 'fespinozameeeeeeee@gmail.cl', 'F1f1f2f3'),
('abismal6', 'Felipe Espinoza', 'fespinozame@gmail.cl', 'F1f1f2f3'),
('abismal7', 'Felipe Espinoza', 'fespinozamee@gmail.cl', 'F1f1f2f3'),
('abismal8', 'Felipe Espinoza', 'fespinozameee@gmail.cl', 'F1f1f2f3'),
('abismal9', 'Felipe Espinoza', 'fespinozameeee@gmail.cl', 'F1f1f2f3');

-- --------------------------------------------------------

--
-- Table structure for table `visitante`
--

CREATE TABLE `visitante` (
  `id_visita` int(7) NOT NULL,
  `id_publicacion` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `visualiza`
--

CREATE TABLE `visualiza` (
  `usuario` varchar(50) NOT NULL,
  `id_publicacion` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comentario`
--
ALTER TABLE `comentario`
  ADD PRIMARY KEY (`id_comentario`),
  ADD KEY `comentario_publicacion` (`id_publicacion`);

--
-- Indexes for table `contacta`
--
ALTER TABLE `contacta`
  ADD PRIMARY KEY (`id_oferente`,`id_demandante`),
  ADD KEY `contacta_demandante` (`id_demandante`);

--
-- Indexes for table `demandante`
--
ALTER TABLE `demandante`
  ADD PRIMARY KEY (`usuario`);

--
-- Indexes for table `moderador`
--
ALTER TABLE `moderador`
  ADD PRIMARY KEY (`usuario`);

--
-- Indexes for table `oferente`
--
ALTER TABLE `oferente`
  ADD PRIMARY KEY (`usuario`);

--
-- Indexes for table `publica`
--
ALTER TABLE `publica`
  ADD PRIMARY KEY (`id_oferente`,`id_publicacion`),
  ADD KEY `publica_publicacion` (`id_publicacion`);

--
-- Indexes for table `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `publicacion_moderador` (`id_moderador`);

--
-- Indexes for table `review`
--
ALTER TABLE `review`
  ADD PRIMARY KEY (`id_review`),
  ADD KEY `review_publicacion` (`id_publicacion`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id_usuario`);

--
-- Indexes for table `visitante`
--
ALTER TABLE `visitante`
  ADD PRIMARY KEY (`id_visita`,`id_publicacion`),
  ADD KEY `visitante_publicacion` (`id_publicacion`);

--
-- Indexes for table `visualiza`
--
ALTER TABLE `visualiza`
  ADD PRIMARY KEY (`usuario`,`id_publicacion`),
  ADD KEY `visualiza_publicacion` (`id_publicacion`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `publicacion`
--
ALTER TABLE `publicacion`
  MODIFY `id_publicacion` int(7) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `visitante`
--
ALTER TABLE `visitante`
  MODIFY `id_visita` int(7) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comentario`
--
ALTER TABLE `comentario`
  ADD CONSTRAINT `comentario_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `contacta`
--
ALTER TABLE `contacta`
  ADD CONSTRAINT `contacta_demandante` FOREIGN KEY (`id_demandante`) REFERENCES `demandante` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contacta_oferente` FOREIGN KEY (`id_oferente`) REFERENCES `oferente` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `demandante`
--
ALTER TABLE `demandante`
  ADD CONSTRAINT `demandante_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `moderador`
--
ALTER TABLE `moderador`
  ADD CONSTRAINT `moderador_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `oferente`
--
ALTER TABLE `oferente`
  ADD CONSTRAINT `oferente_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `publica`
--
ALTER TABLE `publica`
  ADD CONSTRAINT `publica_oferente` FOREIGN KEY (`id_oferente`) REFERENCES `oferente` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publica_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `publicacion_moderador` FOREIGN KEY (`id_moderador`) REFERENCES `moderador` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `review`
--
ALTER TABLE `review`
  ADD CONSTRAINT `review_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visitante`
--
ALTER TABLE `visitante`
  ADD CONSTRAINT `visitante_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `visualiza`
--
ALTER TABLE `visualiza`
  ADD CONSTRAINT `visualiza_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visualiza_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
