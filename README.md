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

### Database configuration (Sequelize and PosgreSQL)

*yarn add sequelize*
*yarn add sequelize-cli -D*
*yarn add pg pg-hstore*

### Creating migrations

*yarn sequelize migration:create --name=create-customers*
*yarn sequelize db:migrate*
