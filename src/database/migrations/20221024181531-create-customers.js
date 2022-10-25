module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable(
      "customers",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      { schema: "dominando_nodejs" }
    ),

  down: (queryInterface) =>
    queryInterface.dropTable("customers", { schema: "dominando_nodejs" }),
};
