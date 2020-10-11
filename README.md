# sendsay-test

Рабочее приложение расположено по адресу [sendsay.adorazel.online](https://sendsay.adorazel.online)
    
## Развёртывание
    
На сервере должны быть установлены **Docker**, **Docker Compose** и **Traefik**.

Отредактируйте файлы `docker-compose.yml` и `Dockerfile`

Выполните в консоли команду:
    
    docker-compose up -d --build
    
## Альтернативный вариант развёртывания

    npm install    
    npm run build
    npm run server
    
## Разработка

    npm install  
    npm run start 