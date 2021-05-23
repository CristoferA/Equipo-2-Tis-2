-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 20-05-2021 a las 05:25:47
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 8.0.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `atractivos_turisticos_bd`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacta`
--

CREATE TABLE `contacta` (
  `id_oferente` varchar(50) NOT NULL,
  `id_demandante` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `demandante`
--

CREATE TABLE `demandante` (
  `usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `moderador`
--

CREATE TABLE `moderador` (
  `usuario` varchar(50) NOT NULL,
  `codigo_acceso` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `oferente`
--

CREATE TABLE `oferente` (
  `usuario` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publica`
--

CREATE TABLE `publica` (
  `id_oferente` varchar(50) NOT NULL,
  `id_publicacion` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publicacion`
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `usuario` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `email_usuario` varchar(100) NOT NULL,
  `contraseña` varchar(12) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitante`
--

CREATE TABLE `visitante` (
  `id_visita` int(7) NOT NULL,
  `id_publicacion` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visualiza`
--

CREATE TABLE `visualiza` (
  `usuario` varchar(50) NOT NULL,
  `id_publicacion` int(7) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacta`
--
ALTER TABLE `contacta`
  ADD PRIMARY KEY (`id_oferente`,`id_demandante`),
  ADD KEY `contacta_demandante` (`id_demandante`);

--
-- Indices de la tabla `demandante`
--
ALTER TABLE `demandante`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `moderador`
--
ALTER TABLE `moderador`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `oferente`
--
ALTER TABLE `oferente`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `publica`
--
ALTER TABLE `publica`
  ADD PRIMARY KEY (`id_oferente`,`id_publicacion`),
  ADD KEY `publica_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD PRIMARY KEY (`id_publicacion`),
  ADD KEY `publicacion_moderador` (`id_moderador`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`usuario`);

--
-- Indices de la tabla `visitante`
--
ALTER TABLE `visitante`
  ADD PRIMARY KEY (`id_visita`,`id_publicacion`),
  ADD KEY `visitante_publicacion` (`id_publicacion`);

--
-- Indices de la tabla `visualiza`
--
ALTER TABLE `visualiza`
  ADD PRIMARY KEY (`usuario`,`id_publicacion`),
  ADD KEY `visualiza_publicacion` (`id_publicacion`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `visitante`
--
ALTER TABLE `visitante`
  MODIFY `id_visita` int(7) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacta`
--
ALTER TABLE `contacta`
  ADD CONSTRAINT `contacta_demandante` FOREIGN KEY (`id_demandante`) REFERENCES `demandante` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `contacta_oferente` FOREIGN KEY (`id_oferente`) REFERENCES `oferente` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `demandante`
--
ALTER TABLE `demandante`
  ADD CONSTRAINT `demandante_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `moderador`
--
ALTER TABLE `moderador`
  ADD CONSTRAINT `moderador_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `oferente`
--
ALTER TABLE `oferente`
  ADD CONSTRAINT `oferente_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publica`
--
ALTER TABLE `publica`
  ADD CONSTRAINT `publica_oferente` FOREIGN KEY (`id_oferente`) REFERENCES `oferente` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `publica_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `publicacion`
--
ALTER TABLE `publicacion`
  ADD CONSTRAINT `publicacion_moderador` FOREIGN KEY (`id_moderador`) REFERENCES `moderador` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visitante`
--
ALTER TABLE `visitante`
  ADD CONSTRAINT `visitante_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `visualiza`
--
ALTER TABLE `visualiza`
  ADD CONSTRAINT `visualiza_publicacion` FOREIGN KEY (`id_publicacion`) REFERENCES `publicacion` (`id_publicacion`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `visualiza_usuario` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`usuario`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
