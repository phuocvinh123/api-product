import { Avatar, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import {
  AddConversation,
  ContainerStyle,
  ContentChatStart,
  Friend,
  InputMessage,
  InputStyle,
  LabelSelect,
  LeftContent,
  ListConversation,
  ListMessageFriend,
  MessageDetail,
  Messages,
  NameMe,
  RightContent,
  SendOutlinedStyle,
  UserMe,
} from './style';
import { FormProvider, useForm } from 'react-hook-form';
import { useAuth } from 'slices';
import {
  DataSnapshot,
  get,
  onChildAdded,
  onChildChanged,
  push,
  ref,
  serverTimestamp,
  set,
  update,
} from 'firebase/database';
import { useEffect, useState } from 'react';
import CardFriend from './component/CardFriend';
import { db } from './configFireBase';
export type PropsUser = {
  id: string;
  avatar: string;
  name: string;
};
export type PropsListRoomGet = {
  id: string;
  room: string;
};
type PropsMessage = {
  id: string;
  content: string;
  createAt: number;
  room: string;
  seen: boolean;
  senderId: string;
};
export const ChatPage: React.FC = () => {
  const methods = useForm({
    defaultValues: {
      message: '',
    },
  });
  const { user_profile } = useAuth();
  const idMe = user_profile?._id;
  const [userMe, setUserMe] = useState<PropsUser | undefined>(undefined);
  const [listRoomGet, setListRoomGet] = useState<PropsListRoomGet[]>([]);
  const [roomCurrent, setRoomCurrent] = useState<string>('');
  const [listMessage, setListMessage] = useState<PropsMessage[]>([]);
  const [friendCurrent, setFriendCurrent] = useState<PropsUser | undefined>(
    undefined,
  );
  const [listUser, setListUser] = useState<PropsUser[]>([]);
  const [listUserOut, setListUserOut] = useState<PropsUser[]>([]);
  useEffect(() => {
    //lấy UserMe
    const fetchMe = () => {
      const meRef = ref(db, 'user/' + idMe);
      get(meRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const userMe = {
              id: idMe,
              ...data,
            };
            setUserMe(userMe);
          }
        })
        .catch((error) => {
          console.log('Error fetching me: ', error);
        });
    };
    fetchMe();
  }, [idMe]);
  useEffect(() => {
    //Lấy listRoom_of_Me
    const fetchRoom = () => {
      const roomRef = ref(db, 'room_of_user/' + idMe);
      get(roomRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const rooms = Object.keys(data).map((key, index) => ({
              id: key,
              ...data[key],
            }));
            setListRoomGet(rooms);
          }
        })
        .catch((error) => {
          console.log('Error fetching me: ', error);
        });
    };

    const fetchUserOut = () => {
      const userOutRef = ref(db, 'room_of_user/' + idMe);
      get(userOutRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const usersExist = Object.keys(data).map((key, index) => ({
              id: key,
              ...data[key],
            }));
            const otherUsers = listUser.filter(
              (user) =>
                !usersExist.some(
                  (existingUser) =>
                    existingUser.id === user.id || idMe === user.id,
                ),
            );
            setListUserOut(otherUsers);
          } else {
            setListUserOut(listUser.filter((user) => user.id !== idMe));
          }
        })
        .catch((error) => {
          console.log('Error fetching: ', error);
        });
    };
    fetchRoom();
    fetchUserOut();
  }, [listUser]);
  useEffect(() => {
    //gắn sự kiện thay đổi listRoom
    const roomRef = ref(db, 'room/');
    const childAddedListener = onChildAdded(roomRef, (snapshot) => {
      const newRoom = { id: snapshot.key, ...snapshot.val() };
      console.log(newRoom);
      // setListRoomGet((prevRooms) => [newRoom, ...prevRooms]);
    });

    const childChangedListener = onChildChanged(roomRef, (snapshot) => {
      console.log(snapshot.val());

      // setListRoomGet((prevRooms) =>
      //   prevRooms.map((room) =>
      //     room.id === snapshot.key
      //       ? { id: snapshot.key, ...snapshot.val() }
      //       : room,
      //   ),
      // );
    });
    return () => {
      childAddedListener();
      childChangedListener();
    };
  }, []);

  useEffect(() => {
    const fetchUser = () => {
      const fetchUserRef = ref(db, 'user');
      get(fetchUserRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const users = Object.keys(data).map((key, index) => ({
              id: key,
              ...data[key],
            }));
            setListUser(users);
          }
        })
        .catch((error) => {
          console.log('Error fetching me: ', error);
        });
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchMessage = () => {
      const messageRef = ref(db, 'message/' + roomCurrent);
      get(messageRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.val();
            const messages = Object.keys(data).map((key, index) => ({
              id: key,
              ...data[key],
            }));
            setListMessage(messages);
          }
        })
        .catch((error) => {
          console.log('Error fetching me: ', error);
        });
    };
    fetchMessage();
  }, [roomCurrent]);
  useEffect(() => {
    const messageRef = ref(db, 'message/' + roomCurrent);
    const unsubscribe = onChildAdded(messageRef, (snapshot) => {
      const messageNew = { id: snapshot.key, ...snapshot.val() };
      setListMessage((prevListMessage) => [...prevListMessage, messageNew]);
    });

    return () => {
      unsubscribe();
    };
  }, [roomCurrent]);
  const sendMessage = (data) => {
    writeMessage(data.message);
    updateRoom(data.message);
    methods.reset();
  };
  const handleBtnSend = (e) => {
    e.preventDefault();
    methods.handleSubmit(sendMessage)();
  };
  const handleEnter = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const trimmedValue = e.target.value.trim();
      if (trimmedValue !== '') {
        methods.handleSubmit(sendMessage)();
      }
    }
  };
  const handleSelctFriend = (data) => {
    setListMessage([]);
    setRoomCurrent(data.roomId);
    setFriendCurrent({
      id: data.id,
      avatar: data.avatar,
      name: data.friendShow,
    });
  };
  function createNewRoom(idFriend) {
    const roomRef = push(ref(db, 'room'));
    const roomKey = roomRef.key;

    set(roomRef, {
      user1: idMe,
      user2: idFriend,
      lastMessage: '',
      createAt: serverTimestamp(),
      seen: true,
    });
    const roomOfUserMeRef = ref(db, `room_of_user/${idMe}/${idFriend}`);
    set(roomOfUserMeRef, {
      room: roomKey,
    });
    const roomOfUserFriendRef = ref(db, `room_of_user/${idFriend}/${idMe}`);
    set(roomOfUserFriendRef, {
      room: roomKey,
    });
  }
  function writeMessage(content) {
    const messageRef = push(ref(db, 'message/' + roomCurrent));
    set(messageRef, {
      content: content,
      senderId: idMe,
      seen: false,
      createAt: serverTimestamp(),
    });
  }
  function updateRoom(content) {
    const roomUpdateRef = ref(db, 'room/' + roomCurrent);
    update(roomUpdateRef, {
      lastMessage: content,
      createAt: serverTimestamp(),
      seen: false,
    });
  }
  const onChangeSelect = (value: string) => {
    createNewRoom(value);
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string },
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  return (
    <FormProvider {...methods}>
      <ContainerStyle>
        <LeftContent>
          <UserMe>
            <Avatar
              src={userMe?.avatar}
              style={{ width: '60px', height: '60px' }}
            />
            <NameMe>{userMe?.name}</NameMe>
          </UserMe>
          <AddConversation>
            <LabelSelect>Add new Conversation</LabelSelect>
            <Select
              showSearch
              style={{ fontSize: '18px', lineHeight: '40px' }}
              placeholder="Search Friend"
              optionFilterProp="children"
              onChange={onChangeSelect}
              filterOption={filterOption}
              options={listUserOut.map((user) => ({
                value: user.id,
                label: user.name,
              }))}
            />
          </AddConversation>
          <ListConversation>
            {listRoomGet.map((room, index) => (
              <CardFriend
                key={index}
                rooms={room}
                friend={friendCurrent}
                selectCard={handleSelctFriend}
              />
            ))}
          </ListConversation>
        </LeftContent>
        <RightContent>
          {friendCurrent !== undefined ? (
            <>
              <Friend>
                <Avatar
                  src={friendCurrent?.avatar}
                  style={{ width: '60px', height: '60px' }}
                />
                <NameMe>{friendCurrent?.name}</NameMe>
              </Friend>
              <ListMessageFriend>
                {listMessage.map((messageDetail, index) => (
                  <Messages
                    key={index}
                    style={{
                      justifyContent:
                        messageDetail.senderId === idMe ? 'end' : 'start',
                    }}
                  >
                    {messageDetail.senderId !== idMe ? (
                      <>
                        <Avatar
                          src={friendCurrent?.avatar}
                          style={{ width: '70px', height: '60px' }}
                        />
                        <MessageDetail
                          style={{
                            borderBottomLeftRadius: '20px',
                            borderTopRightRadius: '20px',
                            borderBottomRightRadius: '20px',
                          }}
                        >
                          {messageDetail.content}
                        </MessageDetail>
                      </>
                    ) : (
                      <MessageDetail
                        style={{
                          borderTopLeftRadius: '20px',
                          borderTopRightRadius: '20px',
                          borderBottomLeftRadius: '20px',
                          backgroundColor: '#0084ff',
                          color: 'white',
                        }}
                      >
                        {messageDetail.content}
                      </MessageDetail>
                    )}
                  </Messages>
                ))}
              </ListMessageFriend>
              <InputMessage>
                <PlusOutlined
                  style={{
                    fontSize: '30px',
                    fontWeight: '700',
                    marginRight: '20px',
                  }}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                />
                <InputStyle name={'message'} onKeyDown={handleEnter} />
                <SendOutlinedStyle
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  onClick={handleBtnSend}
                />
              </InputMessage>
            </>
          ) : (
            <ContentChatStart>
              Chào mừng bạn đến với hệ thống chat, Hãy bắt đầu cuộc trò chuyện
              mới
            </ContentChatStart>
          )}
        </RightContent>
      </ContainerStyle>
    </FormProvider>
  );
};
