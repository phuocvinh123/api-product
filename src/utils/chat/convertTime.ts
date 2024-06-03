export function convertTime(timeStamp: number) {
  const messageTimestamp = new Date(timeStamp ?? 0);
  const messageTimeString = messageTimestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  return messageTimeString;
}
