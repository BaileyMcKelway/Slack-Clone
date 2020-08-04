import { User } from './Users';

type Messages = {
  messages: Message[];
};

type Message = {
  message: {
    [key: string]: MessageContent;
  };
};

type MessageContent = {
  author: User;
  authorId: number;
  channelId: number;
  content: string;
  createdAt: string;
  date: string;
  id: number;
  likes: number;
  sortTime: string;
  time: string;
  updatedAt: string;
};
