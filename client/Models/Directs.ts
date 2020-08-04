import { User } from './Users';

type Directs = {
  messages: Direct[];
};

type Direct = {
  message: {
    [key: string]: DirectContent;
  };
};

type DirectContent = {
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
