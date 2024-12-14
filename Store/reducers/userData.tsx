export default function userData(state: {}, action: any) {
  switch (action.type) {
    case "userData":
      return action.payload.data;
    default:
      return state;
  }
}
