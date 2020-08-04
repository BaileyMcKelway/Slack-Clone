import { User } from './Users';

export type Directs = {
  messages: Direct[];
};

export type Direct = {
  message: {
    [key: string]: DirectContent;
  };
};

export type DirectContent = {
  author: User;
  authorId: number;
  content: string;
  createdAt: string;
  date: string;
  id: number;
  likes: number;
  receiver: number;
  sender: number;
  sortTime: string;
  time: string;
  updatedAt: string;
};
