export default function weatherDetails(state: {}, action: any): any {
  switch (action.type) {
    case "weatherDetails":
      return action.payload.data;
    default:
      return state || {};
  }
}
