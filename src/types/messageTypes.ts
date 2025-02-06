export type MessageType = {
  _id: string;
  message: string;
  fromId: string;
  toId: string;
  createdAt: Date;
  updatedAt: Date;
}