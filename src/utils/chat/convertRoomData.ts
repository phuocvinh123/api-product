import { Room, RoomChat } from 'types/room';

export const convertRoomData = (room: Room, me: string): RoomChat => {
  if (me === room.user1) {
    return {
      lastMessage: room.lastMessage,
      friend: room.user2,
    };
  } else {
    return {
      lastMessage: room.lastMessage,
      friend: room.user1,
    };
  }
};
