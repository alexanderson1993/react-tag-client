import React, { useEffect, useReducer, useMemo } from "react";
import propTypes from "prop-types";
import { auth } from "../helpers/firebase";

function reducer({ loading, user }, action) {
  if (action.type === "gotUser") {
    return {
      loading: false,
      user: {
        ...auth.currentUser,
        id: auth.currentUser && auth.currentUser.uid,
      },
    };
  }
  if (action.type === "logout") {
    return { loading: false, user: null };
  }
  return { loading, user };
}

const AuthContext = React.createContext({
  user: null,
  login: () => {},
  logout: () => {},
});

const AuthProvider = ({ children }) => {
  const [{ loading, user }, dispatch] = useReducer(reducer, {
    loading: true,
    user: null,
  });
  // Update the user state whenever the Firebase auth status changes
  useEffect(() => {
    auth.onAuthStateChanged(userObj => {
      if (userObj) {
        dispatch({ type: "gotUser" });
      } else {
        dispatch({ type: "logout" });
      }
    });
  }, []);

  const actions = {
    logout: () => {
      return auth.signOut();
    },
  };
  const value = useMemo(() => ({ ...actions, user, loading }), [
    actions,
    loading,
    user,
  ]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: propTypes.node,
};

export function useAuth() {
  return React.useContext(AuthContext);
}

export default AuthProvider;
