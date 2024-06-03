import { SendOutlined } from '@ant-design/icons';
import { TextInput } from 'components';
import { Button } from 'components/Button';
import Container from 'components/Container/Container';
import styled from 'styled-components';

const ContainerStyle = styled(Container)`
  border: 1px solid lightgrey;
  border-radius: 10px;
  display: flex;
  background-color: whitesmoke;
  margin-bottom: 20px;
  height: 700px;
`;
const LeftContent = styled.div`
  flex: 4;
  margin-right: 50px;
`;
const RightContent = styled.div`
  flex: 8;
`;
const UserMe = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgrey;
`;
const Friend = styled.div`
  padding: 20px;
  border-bottom: 1px solid lightgrey;
`;
const NameMe = styled.span`
  font-size: 18px;
  font-weight: 700;
  margin-left: 20px;
`;
const ButtonStyle = styled(Button)`
  font-size: 18px;
  font-weight: 500;
  width: 80%;
  height: 50px;
  margin-inline: auto;
`;
const AddConversation = styled.div`
  display: flex;
  margin-block: 20px;
  height: 40px;
`;
const ListConversation = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  height: 500px;
`;
const CardFriendStyle = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-bottom: 1px solid lightgrey;
  margin-right: 20px;
  border-radius: 5px;
  &:hover {
    cursor: pointer;
    background-color: lightgrey;
  }
  &.card-active {
    background-color: lightgrey;
  }
`;
const ContentCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 20px;
`;
const NameFriend = styled.div`
  font-size: 17px;
  font-weight: 500;
`;
const TitleCard = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;
const TimeCreate = styled.div`
  font-size: 15px;
  font-weight: 500;
`;
const LastMessage = styled.div`
  margin-top: 10px;
`;
const ListMessageFriend = styled.div`
  overflow-y: scroll;
  height: 70%;
  display: flex;
  flex-direction: column;
`;
const Messages = styled.div`
  display: flex;
  flex-direction: row;
`;
const MessageDetail = styled.div`
  font-size: 15px;
  font-weight: 500;
  max-width: 70%;
  margin: 5px;
  background-color: white;
  padding: 15px;
  border: 1px solid grey;
`;
const InputMessage = styled.div`
  display: flex;
  flex-direction: row;
  margin-inline: 30px;
`;
const InputStyle = styled(TextInput)`
  margin-right: 20px;
  font-size: 15px;
  font-weight: 500;
  height: 50px;
  padding: 15px;
`;
const SendOutlinedStyle = styled(SendOutlined)`
  font-size: 30px;
  font-weight: 700;
  margin-left: 20px;
  &:hover {
    opacity: 0.3;
    cursor: pointer;
  }
`;
const ContentChatStart = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-top: 50px;
`;
const LabelSelect = styled.span`
  font-size: 18px;
  font-weight: 500;
  line-height: 40px;
  margin-right: 20px;
`;
export {
  ContainerStyle,
  LeftContent,
  RightContent,
  UserMe,
  Friend,
  NameMe,
  ButtonStyle,
  AddConversation,
  ListConversation,
  CardFriendStyle,
  TitleCard,
  NameFriend,
  TimeCreate,
  ContentCard,
  LastMessage,
  ListMessageFriend,
  Messages,
  MessageDetail,
  InputMessage,
  InputStyle,
  SendOutlinedStyle,
  ContentChatStart,
  LabelSelect,
};
