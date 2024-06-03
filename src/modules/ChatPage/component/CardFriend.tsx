import { Avatar } from 'antd';
import {
  CardFriendStyle,
  ContentCard,
  LastMessage,
  NameFriend,
  TimeCreate,
  TitleCard,
} from '../style';
import { convertTime } from 'utils/chat/convertTime';
import { PropsListRoomGet, PropsUser } from '..';
import { FC, useEffect, useState } from 'react';
import { DataSnapshot, get, ref } from 'firebase/database';
import { db } from '../configFireBase';
import { useAuth } from 'slices';
type PropsCard = {
  lastMessage: string;
  createAt: number;
  seen: boolean;
  senderId: string;
  friendId: string;
  friendShow: string;
  avatar: string;
};
type PropsInputCardFriend = {
  friend: PropsUser | undefined;
  rooms: PropsListRoomGet | undefined;
  selectCard: (card: any) => void;
};
const CardFriend: FC<PropsInputCardFriend> = ({
  friend,
  rooms,
  selectCard,
}) => {
  const { user_profile } = useAuth();
  const idMe = user_profile?._id;
  const [dataCard, setDataCard] = useState<PropsCard>({
    lastMessage: '',
    createAt: 0,
    seen: false,
    senderId: '',
    friendId: '',
    friendShow: '',
    avatar: '',
  });
  useEffect(() => {
    const fetchRoomDetail = () => {
      const roomDetailRef = ref(db, 'room/' + rooms?.room);
      get(roomDetailRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            setDataCard((preS) => ({
              ...preS,
              lastMessage: data.lastMessage,
              createAt: data.createAt,
              seen: data.seen,
              senderId: data.senderId,
              friendId: data.user1 !== idMe ? data.user1 : data.user2,
            }));
          }
        })
        .catch((error) => {
          console.log('Error fetching me: ', error);
        });
    };
    const fetchUserDetail = () => {
      const userDetailRef = ref(db, 'user/' + rooms?.id);
      console.log(rooms?.id);
      get(userDetailRef).then((snapshot: DataSnapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setDataCard((preS) => ({
            ...preS,
            friendShow: data.name,
            avatar: data.avatar,
          }));
        }
      });
    };
    fetchRoomDetail();
    fetchUserDetail();
  }, [rooms]);
  const handleClick = () => {
    selectCard({
      ...dataCard,
      roomId: rooms?.room,
    });
  };
  return (
    <CardFriendStyle
      className={dataCard?.friendShow === friend?.name ? 'card-active' : ''}
      onClick={handleClick}
    >
      <Avatar
        src={dataCard?.avatar}
        style={{ width: '60px', height: '50px' }}
      />
      <ContentCard>
        <TitleCard>
          <NameFriend>{dataCard?.friendShow}</NameFriend>
          <TimeCreate>{convertTime(dataCard?.createAt)}</TimeCreate>
        </TitleCard>
        <LastMessage>{dataCard?.lastMessage}</LastMessage>
      </ContentCard>
    </CardFriendStyle>
  );
};
export default CardFriend;
