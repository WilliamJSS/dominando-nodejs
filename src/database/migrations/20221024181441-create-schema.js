module.exports = {
  up: (Sequelize) => Sequelize.createSchema("dominando_nodejs"),

  down: (Sequelize) => Sequelize.dropSchema("dominando_nodejs"),
};
