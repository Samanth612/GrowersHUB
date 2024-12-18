export default function UserAlbum(state: [], action: any): any {
  switch (action.type) {
    case "userAlbumData":
      return action.payload.data;
    case "removeAlbumData":
      return action.payload.data;
    default:
      return state || null;
  }
}
