DROP DATABASE IF EXISTS database_examen;
CREATE DATABASE database_examen CHARSET utf8mb4;
USE database_examen;

CREATE TABLE usuarios(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50),
    full_name VARCHAR(50),
    email VARCHAR(100)
);

CREATE TABLE coches(
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    potencia INT,
    url_imagen VARCHAR(200)
);




