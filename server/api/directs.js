const router = require('express').Router();
const { Direct, Author } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const messages = await Direct.findAll();

    res.json(messages);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const author = await Author.findOne({
      where: { id: req.body.userId },
    });

    const newMessage = await Direct.create({
      content: req.body.content,
      receiver: Number(req.body.directId),
      sender: Number(req.body.userId),
    });

    newMessage.setAuthor(author, { save: false });
    newMessage.receiver = Number(req.body.directId);
    newMessage.sender = Number(req.body.userId);
    await newMessage.save();

    const returnMessage = newMessage.toJSON();
    returnMessage.author = author;

    res.json(returnMessage);
  } catch (err) {
    next(err);
  }
});
