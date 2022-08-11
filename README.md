use jwtexample2;

CREATE TABLE users ( id int(20) unsigned NOT NULL AUTO_INCREMENT, email varchar(50) DEFAULT NULL, password varchar(120) DEFAULT NULL, username varchar(20) DEFAULT NULL, PRIMARY KEY (id)) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;