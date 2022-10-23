import React, { useContext, useState, createContext,useEffect } from "react";
const Context = createContext();

export function ContextProvider({ children }) {
  const [matchData, setmatchData] = useState([]);
  useEffect(() => {
    const data=JSON.parse(localStorage.getItem("matchData"))
    if(data===null){
      setmatchData([]);
    }else{
      setmatchData(data);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Context.Provider value={{ matchData, setmatchData }}>
      {children}
    </Context.Provider>
  );
}

export function useAPI() {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error("Context must be used within a Provider");
  }
  return context;
}
