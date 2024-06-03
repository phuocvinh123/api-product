export interface Message {
  id: string;
  content: string;
  createAt: number;
  room: string;
  seen: boolean;
  senderId: string;
}
