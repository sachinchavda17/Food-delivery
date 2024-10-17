import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [token, setToken] = useState("");

  useEffect(() => {
    const existsToken = localStorage.getItem("adminToken");
    if (existsToken) {
      setToken(existsToken);
      // console.log("Token retrieved:", existsToken); 
    }
  }, []);

  const contextValue = {
    token,
    setToken,
  };
  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
