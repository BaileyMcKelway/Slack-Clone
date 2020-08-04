export type Channels = {
  channel: Channel[];
};

export type Channel = {
  channel: {
    [key: string]: ChannelContents;
  };
};

export type ChannelContents = {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
};
