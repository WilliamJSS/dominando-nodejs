import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        pasword_hash: Sequelize.STRING,
      },
      {
        sequelize,
        underscored: true,
      }
    );
  }
}

export default User;
