const router = require('express').Router();
const { Author, Message } = require('../db/models');

module.exports = router;

router.put('/:authorId', async (req, res, next) => {
  try {
    const authorId = req.params.authorId;
    const messageId = req.body.messageId;
    let author = await Author.findOne({
      where: { id: authorId },
    });

    await author.update({ saved: [...author.saved, messageId] });

    res.status(204).end();
  } catch (err) {
    next(err);
  }
});
