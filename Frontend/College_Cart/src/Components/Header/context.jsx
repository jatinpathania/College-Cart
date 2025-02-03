import React, { createContext, useState } from "react";

const UserDataContext = createContext();

const UserDataProvider =({children})=>{
  const [data, setData] = useState('');
  return(
    <UserDataContext.Provider value={{data,setData}}>
        {children}
    </UserDataContext.Provider>
  )
}

export {UserDataContext, UserDataProvider};