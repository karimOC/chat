"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Message extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.Message.belongsTo(models.User, {
        foreignKey: {
          name: "idUsers",
          allowNull: false,
        },
      });
      models.Message.belongsTo(models.Conversation, {
        foreignKey: {
          name: "idConversation",
          allowNull: false,
        },
      });
    }
  }
  Message.init(
    {
      idConversation: DataTypes.INTEGER,
      idCreater: DataTypes.INTEGER,
      idUsers: DataTypes.INTEGER,
      message: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Message",
    }
  );
  return Message;
};
