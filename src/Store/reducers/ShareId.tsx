export default function ShareId(state: null, action: any): any {
  switch (action.type) {
    case "ShareId":
      return action.payload.data;
    default:
      return state || null;
  }
}
