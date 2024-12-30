export default function LatestNotificationData(state: {}, action: any): any {
  switch (action.type) {
    case "LatestNotificationData":
      return action.payload.data;
    default:
      return state || {};
  }
}
