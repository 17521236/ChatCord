export interface IMessageFromServer {
  avatarUrl: string,
  username: string;
  message: string;
  time: any;
  isMine: boolean;
}

export interface IRoomInfo {
  room: string;
  users: IUser[];
}

export interface IUser {
  userId: string;
  username: string;
  room: string;
  avatarUrl: string;
}

export interface IIcon {
  id: string;
  url: string;
}
