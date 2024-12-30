type UserDataState = Record<string, any>; // Define the shape of your state
type UserDataAction = {
  type: "userData";
  payload: {
    data: any; // You can replace `any` with a more specific type if known
  };
};

export default function userData(
  state: UserDataState = {}, // Default state
  action: UserDataAction
): UserDataState {
  switch (action.type) {
    case "userData":
      return action.payload.data; // Update state with payload data
    default:
      return state;
  }
}
