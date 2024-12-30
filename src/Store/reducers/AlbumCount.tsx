export default function AlbumCount(state: 0, action: any): any {
  switch (action.type) {
    case "albumCount":
      return action.payload.data;
    default:
      return state || 0;
  }
}
