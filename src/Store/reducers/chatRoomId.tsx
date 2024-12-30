export default function chatRoomId(state: "", action: any): any {
  switch (action.type) {
    case "chatRoomId":
      return action.payload.data;
    default:
      return state || null;
  }
}
