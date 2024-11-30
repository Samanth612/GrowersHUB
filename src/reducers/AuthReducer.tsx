// AuthReducer.ts
type AuthState = boolean;

type AuthAction = { type: "userLoggedIn" } | { type: "userLoggedOut" };

export default function AuthReducer(
  state: AuthState = false,
  action: AuthAction
): AuthState {
  switch (action.type) {
    case "userLoggedIn":
      return true;
    case "userLoggedOut":
      return false;
    default:
      return state;
  }
}
