export interface User {
  id: string;
  avatar: string;
  name: string;
  lastMessage: string;
  seen: boolean;
  createAt: number;
  senderId: string;
}
