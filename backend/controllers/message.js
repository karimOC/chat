const models = require("../models");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

exports.createMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  if (req.body.message === "") {
    return res
      .status(400)
      .json({ error: "Merci de remplir le champ message." });
  }

  models.Conversation.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((conversation) => {
      // res.json(conversation);
      if (
        conversation.idCreater === userId ||
        conversation.idUsers === userId
      ) {
        models.Message.create({
          idConversation: req.params.id,
          idCreater: conversation.idCreater,
          idUsers: conversation.idUsers,
          message: req.body.message,
        })
          .then(() => res.status(200).json({ message: "Message enregistré !" }))
          .catch((error) => res.status(500).json(error));
      } else {
        res.status(403).json("Access denied !");
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getAllMessages = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  models.Message.findAll({
    order: [["updatedAt", "DESC"]],
    where: {
      [Op.or]: [{ idCreater: userId }, { idUsers: userId }],
      idConversation: req.params.id,
    },
    include: [
      {
        model: models.User,
        attributes: ["name", "firstname"],
      },
    ],
  })
    .then((messages) => {
      res.json(messages);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.deleteMessage = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  models.Message.findOne({
    where: {
      idConversation: req.params.idConversation,
      id: req.params.id,
      idUsers: userId,
    },
  })
    .then((messages) => {
      if (messages.idUsers === userId) {
        messages.destroy().then(() => {
          res.status(200).json({
            message: "Message supprimé !",
          });
        });
      }
    })
    .catch(() => {
      res.status(400).json({
        message: "Le message n'a pas pu être supprimé",
      });
    });
};
