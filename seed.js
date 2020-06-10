const db = require('./server/db');
const Author = require('./server/db/models/author');
const Message = require('./server/db/models/message');
const Channel = require('./server/db/models/channel');
const Direct = require('./server/db/models/direct');

const channels = [
  { name: 'really_random' },
  { name: 'generally_speaking' },
  { name: 'a_quiet_place' },
  { name: 'lunch_planning' },
];

const authors = [
  {
    name: 'Cody Hardy',
    image: '/images/avataaars (1).png',
  },
  {
    name: 'Antonio Lewis',
    image: '/images/avataaars (2).png',
  },
  {
    name: 'Valentine Bates',
    image: '/images/avataaars (3).png',
  },
  {
    name: 'Henry Montgomery',
    image: '/images/avataaars (4).png',
  },
  {
    name: 'Batman Man',
    image: '/images/avataaars (5).png',
  },
  {
    name: 'Paris Talbot',
    image: '/images/avataaars (6).png',
  },
  {
    name: 'Victor Ver',
    image: '/images/avataaars (7).png',
  },
  {
    name: 'Herbert Royale',
    image: '/images/avataaars (8).png',
  },
  {
    name: 'Sarah Fang',
    image: '/images/avataaars (9).png',
  },
  {
    name: 'Viola Montgomery',
    image: '/images/avataaars (10).png',
  },
  {
    name: 'Delmira Henry',
    image: '/images/avataaars (11).png',
  },
  {
    name: 'Fetid French',
    image: '/images/avataaars (12).png',
  },
  {
    name: 'Pork Chop',
    image: '/images/avataaars (13).png',
  },
  {
    name: 'Doll Lowe',
    image: '/images/avataaars (14).png',
  },
  {
    name: 'Timothy Xiong',
    image: '/images/avataaars (15).png',
  },
  {
    name: 'Stanley Foster',
    image: '/images/avataaars (16).png',
  },
  {
    name: 'BenBen',
    image: '/images/avataaars (17).png',
  },
  {
    name: 'Kaylum Tanner',
    image: '/images/avataaars (1).png',
  },
];

const id = () => Math.round(Math.random() * (authors.length - 1)) + 1;

const messages = [
  { authorId: id(), content: 'What is a Slack clone?', channelId: 1 },
  { authorId: id(), content: 'I think this is a Slack clone.', channelId: 1 },
  { authorId: id(), content: 'How do you sign in?', channelId: 1 },
  { authorId: id(), content: 'I like writing web apps!', channelId: 2 },
  { authorId: id(), content: 'You should learn JavaScript!', channelId: 2 },
  { authorId: id(), content: 'JavaScript is pretty great!', channelId: 2 },
  { authorId: id(), content: 'Dogs are great!', channelId: 3 },
  { authorId: id(), content: 'Cats are also great!', channelId: 3 },
  { authorId: id(), content: 'Why must we fight so?', channelId: 3 },
  { authorId: id(), content: 'I want to get tacos!', channelId: 4 },
  { authorId: id(), content: 'I want to get salad!', channelId: 4 },
  { authorId: id(), content: 'I want a taco salad!', channelId: 4 },
];

const seed = () =>
  Promise.all(authors.map((author) => Author.create(author)))
    .then(() => Promise.all(channels.map((channel) => Channel.create(channel))))
    .then(() =>
      Promise.all(messages.map((message) => Message.create(message)))
    );

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch((err) => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
