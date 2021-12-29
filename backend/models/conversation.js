"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Conversation.belongsTo(models.User, {
        as: "creator",
        foreignKey: "idCreater",
      });
      models.Conversation.belongsTo(models.User, {
        as: "guest",
        foreignKey: "idUsers",
      });
      // models.Conversation.belongsTo(models.User, {
      //   foreignKey: {
      //     name: "idUsers",
      //     allowNull: false,
      //   },
      // });
      models.Conversation.hasMany(models.Message, {
        foreignKey: {
          name: "idConversation",
          allowNull: false,
        },
      });
    }
  }
  Conversation.init(
    {
      idCreater: DataTypes.INTEGER,
      idUsers: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Conversation",
    }
  );
  return Conversation;
};
