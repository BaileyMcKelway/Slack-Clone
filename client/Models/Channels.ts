type Channels = {
  channel: Channel[];
};

type Channel = {
  channel: {
    [key: string]: ChannelContents;
  };
};

type ChannelContents = {
  createdAt: string;
  id: number;
  name: string;
  updatedAt: string;
};
