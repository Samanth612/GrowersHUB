export default function unreadCount(state: number = 0, action: any): number {
  switch (action.type) {
    case "totalunreadCount":
      return action.payload?.data || 0;
    default:
      return state;
  }
}
