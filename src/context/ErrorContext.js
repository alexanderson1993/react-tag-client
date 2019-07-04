import React from "react";
export const ErrorContext = React.createContext();

const initialState = { error: false };
function reducer(state, action) {
  switch (action.type) {
    case "errored":
      return {
        error: true,
        errorData: action.errorData,
        errorInfo: action.errorInfo,
      };
    case "cleared":
      return { error: false, errorData: null, errorInfo: null };
    default:
      throw new Error();
  }
}
const ErrorProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(() => ({ state, dispatch }), [state]);
  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};

export default ErrorProvider;
