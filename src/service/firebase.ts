import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import { dbf } from 'modules/ChatPage/configFireBase';
async function sendMessages(roomId, user, text) {
  try {
    await addDoc(collection(dbf, 'message'), {
      senderId: user,
      room: roomId,
      content: text.trim(),
      createAt: serverTimestamp(),
      seen: false,
    });
  } catch (error) {
    console.error(error);
  }
}

function getMessages(roomId, callback) {
  return onSnapshot(
    query(collection(dbf, 'message', roomId), orderBy('createAt', 'asc')),
    (querySnapshot) => {
      const messages = querySnapshot.docs.map((x) => ({
        id: x.id,
        ...x.data(),
      }));

      callback(messages);
    },
  );
}
export { sendMessages, getMessages };
