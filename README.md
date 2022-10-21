# Dominando o NodeJS

Projeto desenvolvido durante o curso de NodeJS do DevSamurai.

### Creating project
<br>

```bash
mkdir dominando-nodejs
cd dominando-nodejs
yarn init -y
yarn add express
yarn add nodemon -D
```
### Adjusting imports/exports
<br>

```bash
yarn add sucrase -D
```
### Editor configurations
<br>

```bash
yarn add eslint -D
yarn eslint --init
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
yarn eslint --fix src --ext .js
```
### Database configuration (Sequelize and PosgreSQL)
<br>

```bash
yarn add sequelize
yarn add sequelize-cli -D
yarn add pg pg-hstore
```
### Creating migrations
<br>

```bash
yarn sequelize migration:create --name=migration-name
yarn sequelize db:migrate
```

### Formatting dates

```bash
yarn add date-fns
```
