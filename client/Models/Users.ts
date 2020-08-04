export type Users = {
  users: User[];
};

export type User = {
  user: {
    [key: string]: UserContent;
  };
};

export type UserContent = {
  createdAt: string;
  id: number;
  image: string;
  name: string;
  saved: number[];
  updatedAt: string;
};
