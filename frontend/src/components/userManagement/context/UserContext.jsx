import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

function AuthContextProvider(props) {
  /* Setting the state of the component. */
  const [userType, setUserType] = useState(null);

  // ────────────────────────────────────────────────────────────────────────────────

  useEffect(() => {
    /* Setting the userType and status to the local storage. */
    setUserType(localStorage.getItem("type"));

    if (localStorage.getItem("user") === undefined) {
      /* This is removing the type and status from local storage. */
      localStorage.removeItem("type");
      /* This is setting the userType and status to the local storage. */
      setUserType(localStorage.getItem("type"));
    }
  }, []);

  // ────────────────────────────────────────────────────────────────────────────────

  /* Returning the AuthContext.Provider component with the value of userType and status. */
  return (
    <AuthContext.Provider value={{ userType }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
export { AuthContextProvider };
