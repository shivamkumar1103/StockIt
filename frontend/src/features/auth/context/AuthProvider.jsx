import { AuthContext } from "./AuthContext";
import useLogout from "../hooks/useLogout";
import { useUser } from "../hooks/useUser";

function AuthProvider({ children }) {
  //1 ) get user
  const { user, isPending, isError } = useUser() || {};

  // 2) log out
  const {
    logout,
    isPending: isLoggingOut,
    isError: isLogoutError,
  } = useLogout() || {};

  //2 ) create value object that will be provided to the context consumers
  const value = {
    user,
    isPending,
    isError,
    logout,
    isLoggingOut,
    isLogoutError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
