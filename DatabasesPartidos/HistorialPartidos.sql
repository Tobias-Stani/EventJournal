-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: db
-- Tiempo de generación: 12-06-2024 a las 02:17:05
-- Versión del servidor: 8.1.0
-- Versión de PHP: 8.2.19

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `HistorialPartidos`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuration`
--

CREATE TABLE `configuration` (
  `id` int NOT NULL,
  `site_status` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `configuration`
--

INSERT INTO `configuration` (`id`, `site_status`) VALUES
(1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctrine_migration_versions`
--

CREATE TABLE `doctrine_migration_versions` (
  `version` varchar(191) COLLATE utf8mb3_unicode_ci NOT NULL,
  `executed_at` datetime DEFAULT NULL,
  `execution_time` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

--
-- Volcado de datos para la tabla `doctrine_migration_versions`
--

INSERT INTO `doctrine_migration_versions` (`version`, `executed_at`, `execution_time`) VALUES
('DoctrineMigrations\\Version20240524040556', '2024-05-24 23:47:36', 228),
('DoctrineMigrations\\Version20240525025731', '2024-05-24 23:57:45', 30),
('DoctrineMigrations\\Version20240605203320', '2024-06-05 17:33:27', 32),
('DoctrineMigrations\\Version20240609213651', '2024-06-09 18:37:00', 32),
('DoctrineMigrations\\Version20240610001238', '2024-06-09 21:12:46', 106);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `messenger_messages`
--

CREATE TABLE `messenger_messages` (
  `id` bigint NOT NULL,
  `body` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `headers` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue_name` varchar(190) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `available_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)',
  `delivered_at` datetime DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `partidos`
--

CREATE TABLE `partidos` (
  `id` int NOT NULL,
  `local` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `visitante` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `gol_local` int DEFAULT NULL,
  `gol_visitante` int DEFAULT NULL,
  `estadio` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `competencia` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `link` longtext COLLATE utf8mb4_unicode_ci,
  `rating` int DEFAULT NULL,
  `observacion` longtext COLLATE utf8mb4_unicode_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `partidos`
--

INSERT INTO `partidos` (`id`, `local`, `visitante`, `gol_local`, `gol_visitante`, `estadio`, `competencia`, `fecha`, `link`, `rating`, `observacion`) VALUES
(1, 'Deportivo Merlo', 'Chicago', 1, 2, 'Estadio José Manuel Moreno', 'Primera B', '2008-11-01', 'https://www.youtube.com/watch?v=iyNjRkY3F9g', NULL, NULL),
(2, 'Velez', 'Iquique', 3, 0, 'Jose Amalfitani', 'Copa Santander LIbertadores', '2013-04-02', 'https://www.youtube.com/watch?v=Nd__PsYd5Qo', NULL, NULL),
(3, 'River', 'Liga de quito', 2, 0, 'Monumental antonio vespucio liberti', 'Copa sudamericana', '2015-05-23', 'https://www.youtube.com/watch?v=OoEb_BKPyc8', NULL, NULL),
(6, 'River', 'San Lorenzo', 0, 1, 'Monumental antonio vespucio liberti', 'Superliga', '2019-12-08', 'https://www.youtube.com/watch?v=av4xLTerB10', NULL, NULL),
(7, 'River', 'Velez', 0, 0, 'Monumental antonio vespucio liberti', 'COPA JUAN GILBERTO FUNES', '2022-02-05', 'https://www.youtube.com/watch?v=ATNfd-yQEOI', NULL, NULL),
(8, 'River', 'Racing', 2, 2, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2022-02-27', 'https://www.youtube.com/watch?v=2qefmYU-WCc&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=6', NULL, NULL),
(9, 'River', 'Argentinos Juniors', 4, 2, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2022-04-10', 'https://www.youtube.com/watch?v=Wcfg6wai-Dg&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=2', NULL, NULL),
(10, 'River', 'Platense', 2, 1, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2022-05-08', 'https://www.youtube.com/watch?v=vRloVhTRKSI&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=1&t=144s', NULL, NULL),
(11, 'River', 'Colo Colo', 4, 0, 'Monumental antonio vespucio liberti', 'Copa Libertadores', '2022-05-08', 'https://www.youtube.com/watch?v=eCRDtK-g9_g&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=7', NULL, NULL),
(12, 'River', 'Atletico Tucuman', 0, 0, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2022-06-11', 'https://www.youtube.com/watch?v=_7ltA_mRwrY&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=8', NULL, NULL),
(13, 'River', 'Velez', 0, 0, 'Estadio José Manuel Moreno', 'Copa Libertadores', '2022-07-06', 'https://www.youtube.com/watch?v=INK8V9wHIm0&t=21s', NULL, NULL),
(14, 'River', 'Nwells', 4, 1, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2022-08-13', 'https://www.youtube.com/watch?v=_7ltA_mRwrY&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=8', NULL, NULL),
(15, 'River', 'Central Cordoba', 3, 0, 'Monumental antonio vespucio liberti', 'Liga Profesional', '2022-08-21', 'https://www.youtube.com/watch?v=IDJhZq8imAQ&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=10', NULL, NULL),
(16, 'River', 'Talleres', 0, 1, 'Monumental antonio vespucio liberti', 'Liga Profesional', '2022-09-24', 'https://www.youtube.com/watch?v=Vp9Qthzqiok&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=11', NULL, NULL),
(17, 'River', 'Estudiantes', 5, 0, 'Monumental antonio vespucio liberti', 'Liga Profesional', '2022-10-05', 'https://www.youtube.com/watch?v=DL3yRfdsShs', NULL, NULL),
(18, 'River', 'Argentinos Juniors', 2, 1, 'Monumental antonio vespucio liberti', 'Torneo Local', '2023-02-13', 'https://www.youtube.com/watch?v=j7bMJgI-0qc&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=14', NULL, NULL),
(19, 'River', 'Godoy Cruz', 3, 0, 'Monumental antonio vespucio liberti', 'Torneo Local', '2023-03-12', 'https://www.youtube.com/watch?v=j7bMJgI-0qc&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=14', NULL, NULL),
(20, 'Huracan', 'River', 0, 3, 'Tomas Adolfo Duco', 'Torneo Local', '2023-04-09', 'https://www.youtube.com/watch?v=r57kPIFMDYQ&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=18', NULL, NULL),
(21, 'River', 'Sporting Cristal', 4, 2, 'Monumental antonio vespucio liberti', 'Copa Libertadores', '2023-04-19', 'https://www.youtube.com/watch?v=kPe9n68Ah08&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=20', NULL, NULL),
(22, 'River', 'Boca', 1, 0, 'Monumental antonio vespucio liberti', 'Torneo Local', '2023-05-07', 'https://www.youtube.com/watch?v=cKFzxa6_egw&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=22', 5, 'Primer superclasico en la historia que fui a la cancha, encima le rompimos bien el orto, gol en el ulitmo minuto y fiesta, recuerdo para toda la vida.'),
(23, 'River', 'Platense', 2, 1, 'Monumental antonio vespucio liberti', 'Torneo Local', '2023-05-21', 'https://www.youtube.com/watch?v=1OJMfgnXTWc&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=25', NULL, NULL),
(24, 'Barracas', 'San Lorenzo', 1, 0, 'Estadio Chiqui Tapia', 'Torneo Local', '2023-05-28', 'https://www.youtube.com/watch?v=ZJwQL2EV5Ls&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=26', 1, NULL),
(25, 'River', 'Fluminense', 2, 0, 'Monumental antonio vespucio liberti', 'Copa Libertadores', '2023-06-07', 'https://www.youtube.com/watch?v=WPQ5pBp6af0&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=27', NULL, NULL),
(26, 'River', 'Instituto', 3, 1, 'Monumental antonio vespucio liberti', 'Torneo Local', '2023-06-22', 'https://www.youtube.com/watch?v=6hdsobDWdWk&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=28', NULL, NULL),
(27, 'Barracas', 'River', 2, 1, 'Estadio Chiqui Tapia', 'Torneo Local', '2023-07-01', 'https://www.youtube.com/watch?v=3B1K-nRPL-4&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=29', NULL, NULL),
(28, 'River', 'Racing', 2, 1, 'Monumental antonio vespucio liberti', 'Torneo Local', '2023-07-28', 'https://www.youtube.com/watch?v=5TR7WGRy6Tw&t=22s', NULL, NULL),
(29, 'Velez', 'River', 2, 0, 'Jose Amalfitani', 'Copa de la liga', '2023-09-02', 'https://www.youtube.com/watch?v=ZOZ7r5yI67A&list=PLanUM4FQCDdtPd4c5mzqVdSPgeKu_i-5n&index=33', NULL, NULL),
(30, 'River', 'Arsenal', 3, 1, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2023-09-17', 'https://www.youtube.com/watch?v=f7lvzknJDsM', NULL, NULL),
(31, 'Banfield', 'River', 1, 1, 'Estadio Florencio Sola', 'Copa de la liga', '2023-09-24', 'https://www.youtube.com/watch?v=WkVoTXZAKIc', NULL, NULL),
(32, 'River', 'Talleres', 1, 0, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2023-10-08', 'https://www.youtube.com/watch?v=NO8WpUUyhPI', NULL, NULL),
(33, 'River', 'Independiente', 3, 0, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2023-10-25', 'https://www.youtube.com/watch?v=SXqOwIndb0g', NULL, NULL),
(34, 'San Lorenzo', 'Boca', 1, 1, 'Estadio Pedro Bidegain', 'Copa de la liga', '2023-11-08', 'https://www.youtube.com/watch?v=Mb0vT6nG2Do', 5, NULL),
(35, 'Lanus', 'Racing', 0, 2, 'Estadio Ciudad de Lanús', 'Copa de la liga', '2023-11-11', 'https://www.youtube.com/watch?v=9U8MzWUVCOk', 2, NULL),
(36, 'River', 'Argentinos Juniors', 1, 1, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2024-01-28', 'https://www.youtube.com/watch?v=m9yo5jTpnew', NULL, NULL),
(37, 'River', 'Banfield', 1, 1, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2024-02-18', 'https://www.youtube.com/watch?v=RODsHKsGBpc', 3, NULL),
(38, 'River', 'Rosario Central', 2, 1, 'Monumental antonio vespucio liberti', 'Copa de la liga', '2024-04-07', 'https://www.youtube.com/watch?v=lQLseKxyvgk&t=87s', 5, 'Primera vez en la tribuna centenario alta, se vive el partido con mucha mas intensidad y fiesta'),
(39, 'River', 'Nacional', 2, 0, 'Monumental antonio vespucio liberti', 'Copa Libertadores', '2024-04-11', 'https://www.youtube.com/watch?v=Raf2TRheGTk', 4, NULL),
(40, 'Argentinos Juniros', 'River', 1, 0, 'Estadio Diego Armando Maradona', 'Torneo Local', '2024-05-25', 'https://www.youtube.com/watch?v=rvTz_ri62eg', 5, 'Curiosidad del partido: Un señor de Argentinos comenzó a gritar que éramos de River, generando un ambiente tenso. Tuvimos que apurarlo para ver si realmente era valiente y se la bancaba (Fernando quería pegarle).'),
(41, 'River', 'Dep Tachira', 2, 0, 'Monumental antonio vespucio liberti', 'Copa Libertadores', '2024-05-30', 'https://www.youtube.com/watch?v=PQsNEPzO0OE', 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recitales`
--

CREATE TABLE `recitales` (
  `id` int NOT NULL,
  `banda` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `fecha` date NOT NULL,
  `lugar` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `set_list` longtext COLLATE utf8mb4_unicode_ci,
  `observacion` longtext COLLATE utf8mb4_unicode_ci,
  `rate` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `recitales`
--

INSERT INTO `recitales` (`id`, `banda`, `fecha`, `lugar`, `set_list`, `observacion`, `rate`) VALUES
(1, 'Indios', '2024-06-07', 'Niceto', '[url=https://www.setlist.fm/setlist/indios/2024/niceto-club-buenos-aires-argentina-1356d535.html][img]https://www.setlist.fm/widgets/setlist-image-v1?id=1356d535[/img][/url]\r\n[url=https://www.setlist.fm/edit?setlist=1356d535&amp;step=song]Edit this setlist[/url] | [url=https://www.setlist.fm/setlists/indios-23c08457.html]More Indios setlists[/url]', 'Mejor recital de mi vida, primera vez tan cerca del artista y es super hipnotizante', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `role`
--

CREATE TABLE `role` (
  `id` int NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `role`
--

INSERT INTO `role` (`id`, `name`) VALUES
(1, 'ROLE_SISTEMAS'),
(2, 'ROLE_ADMIN'),
(3, 'ROLE_USUARIO'),
(4, 'ROLE_VERIFICADO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int NOT NULL,
  `role_id` int DEFAULT NULL,
  `email` varchar(180) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `active` tinyint(1) NOT NULL,
  `verified` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `role_id`, `email`, `password`, `active`, `verified`) VALUES
(1, 1, 'test@gmail.com', '$2y$13$NEup9aY4cCZtb4qDTSmu4OZnwi8o7CC/rYo7NyYvfT48zwqV2OuvO', 1, 1),
(2, 1, 'stanislavskytobias@gmail.com', '$2y$13$HoLsIDQGxFsrdRNXQaPKaOzmYkE/HZtZJDJ7rh1531sJZze2f7FfO', 1, 1),
(3, 4, 'ferstani@hotmail.com', '$2y$13$f/Xbgmj6iLRJdZSOqgk4p.ZsvnKG1I1M7M2aRo91t1qD.irL4pwKu', 1, 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `configuration`
--
ALTER TABLE `configuration`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `doctrine_migration_versions`
--
ALTER TABLE `doctrine_migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indices de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_75EA56E0FB7336F0` (`queue_name`),
  ADD KEY `IDX_75EA56E0E3BD61CE` (`available_at`),
  ADD KEY `IDX_75EA56E016BA31DB` (`delivered_at`);

--
-- Indices de la tabla `partidos`
--
ALTER TABLE `partidos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `recitales`
--
ALTER TABLE `recitales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_IDENTIFIER_EMAIL` (`email`),
  ADD KEY `IDX_8D93D649D60322AC` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `configuration`
--
ALTER TABLE `configuration`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `messenger_messages`
--
ALTER TABLE `messenger_messages`
  MODIFY `id` bigint NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `partidos`
--
ALTER TABLE `partidos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `recitales`
--
ALTER TABLE `recitales`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `role`
--
ALTER TABLE `role`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FK_8D93D649D60322AC` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
