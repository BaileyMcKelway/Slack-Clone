const Message = require('./message');
const Channel = require('./channel');
const Author = require('./author');
const Direct = require('./direct');

Channel.hasMany(Message, {
  onDelete: 'cascade',
  hooks: true,
});

Author.hasMany(Message);
Author.hasMany(Direct);

Message.belongsTo(Channel);
Message.belongsTo(Author);

Direct.belongsTo(Author, {
  foreignKey: 'receiver',
});
Direct.belongsTo(Author, {
  foreignKey: 'sender',
});

module.exports = {
  Channel,
  Message,
  Author,
  Direct,
};
