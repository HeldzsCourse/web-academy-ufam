npm install

## MySql

docker run -d \
--name mysql-loja \
--network network-loja \
-p 3307:3306 \
-e MYSQL_ROOT_PASSWORD=senhasegura \
-e MYSQL_DATABASE=loja \
-v mysql-volume-loja:/var/lib/mysql \
mysql:latest

## Phpmyadmin

docker run -d \
--name phpmyadmin-loja \
--network network-loja \
-e PMA_HOST=mysql-loja \
-e PMA_PORT=3306 \
-e PMA_USER=root \
-e PMA_PASSWORD=senhasegura \
-p 8080:80 \
phpmyadmin/phpmyadmin

npx prisma db seed
