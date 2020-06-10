const router = require('express').Router();
const { Author, Message } = require('../db/models');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const channels = await Author.findAll();
    res.json(channels);
  } catch (err) {
    next(err);
  }
});

router.put('/:authorId', async (req, res, next) => {
  try {
    const authorId = req.params.authorId;
    const messageId = req.body.messageId;
    let author = await Author.findOne({
      where: { id: authorId },
    });

    if (author.saved.indexOf(messageId.toString()) === -1) {
      await author.update({ saved: [...author.saved, messageId] });
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body);
    const author = await Author.findOrCreate({
      where: {
        name: req.body.name,
      },
    });
    res.json(author);
  } catch (err) {
    next(err);
  }
});
