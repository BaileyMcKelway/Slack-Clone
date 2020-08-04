import { User } from './Users';

export type Messages = {
  messages: Message[];
};

export type Message = {
  message: {
    [key: string]: MessageContent;
  };
};

export type MessageContent = {
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
