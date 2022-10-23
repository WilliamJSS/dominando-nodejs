# Dominando o NodeJS

Project developmented belong at the NodeJS course from DevSamurai.

### Creating project

```bash
mkdir dominando-nodejs
cd dominando-nodejs
yarn init -y
yarn add express
yarn add nodemon -D
```

### Adjusting imports/exports

```bash
yarn add sucrase -D
```

### Editor configurations

```bash
yarn add eslint -D
yarn eslint --init
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D
yarn eslint --fix src --ext .js
```

### Database configuration (Sequelize and PosgreSQL)

```bash
yarn add sequelize
yarn add sequelize-cli -D
yarn add pg pg-hstore
```

### Creating migrations

```bash
yarn sequelize migration:create --name=migration-name
yarn sequelize db:migrate
```

### Formatting dates

```bash
yarn add date-fns
```

### Validating request body

```bash
yarn add yup
```

### Encrypting passwords

```bash
yarn add bcryptjs
```
