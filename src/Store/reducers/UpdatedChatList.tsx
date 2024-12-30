export default function UpdatedChatList(state: null, action: any): any {
  switch (action.type) {
    case "UPDATE_CHAT_LIST":
      return action.payload.data;
    default:
      return state || null;
  }
}
