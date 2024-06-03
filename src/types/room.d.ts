export interface Room {
  id: string;
  lastMessage: string;
  createAt: number;
  seen: boolean;
  senderId: string;
  user1: string;
  user2: string;
}

export interface RoomChat {
  lastMessage: string;
  friend: string;
}
