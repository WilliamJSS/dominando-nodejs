# Dominando o NodeJS

Projeto desenvolvido durante o curso de NodeJS do DevSamurai.

### Creating project...

*mkdir dominando-nodejs*
*cd dominando-nodejs*
*yarn init -y*
*yarn add express*
*yarn add nodemon -D*

### Adjusting imports/exports

*yarn add sucrase -D*

### Editor configurations

*yarn add eslint -D*
*yarn eslint --init*
*yarn add prettier eslint-config-prettier eslint-plugin-prettier -D*
*yarn eslint --fix src --ext .js*

### Database configuration (Sequelize and PosgreSQL)

*yarn add sequelize*
*yarn add sequelize-cli -D*
*yarn add pg pg-hstore*

### Creating migrations

*yarn sequelize migration:create --name=create-customers*
*yarn sequelize migration:create --name=create-contacts*

*yarn sequelize db:migrate*
*yarn sequelize db:migrate:undo*
*yarn sequelize db:migrate:undo:all*