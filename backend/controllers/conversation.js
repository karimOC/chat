const models = require("../models");
const jwt = require("jsonwebtoken");
// const fs = require("fs");
// const { Console } = require("console");
const { Op } = require("sequelize");

exports.createConversation = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  if (req.body.email === "") {
    return res.status(400).json({ error: "Merci de remplir le champ email." });
  }

  models.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      // res.json(user);
      if (!user) {
        return res.status(404).json({ error: "Utilisateur introuvable !" });
      }
      let userNew = user.id;

      models.Conversation.findOne({
        where: {
          idCreater: {
            [Op.or]: [userId, user.id],
          },
          idUsers: {
            [Op.or]: [user.id, userId],
          },
        },
      }).then((userConversation) => {
        // res.json(userConversation);
        if (userConversation) {
          return res.status(404).json({
            error: "Vous avez déjà une conversation avec cet utilisateur !",
          });
        } else if (userConversation === null) {
          models.Conversation.create({
            idCreater: userId,
            idUsers: userNew,
          }).then(() =>
            res.status(201).json({ message: "Conversation crée !" })
          );
        }
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllConversation = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  models.Conversation.findAll({
    order: [["updatedAt", "DESC"]],
    include: [
      {
        model: models.User,
        attributes: ["name", "firstname", "id"],
      },
    ],
    where: { [Op.or]: [{ idCreater: userId }, { idUsers: userId }] },
  })
    .then((conversations) => {
      res.status(200).json(conversations);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneConversation = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  models.Conversation.findOne({
    include: [
      {
        model: models.User,
        attributes: ["name", "firstname"],
      },
    ],
    where: {
      [Op.or]: [{ idCreater: userId }, { idUsers: userId }],
      id: req.params.id,
    },
  })
    .then((conversation) => {
      res.status(200).json(conversation);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.deleteConversation = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  models.Conversation.findOne({
    where: {
      [Op.or]: [{ idCreater: userId }, { idUsers: userId }],
      id: req.params.id,
    },
  })
    .then((conversation) => {
      conversation.destroy().then(() => {
        res.status(200).json({
          conversation: "Conversation supprimé !",
        });
      });
    })
    .catch(() => {
      res.status(400).json({
        message: "La conversation n'a pas pu être supprimé",
      });
    });
};
