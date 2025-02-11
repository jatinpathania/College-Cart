import React, { createContext, useState } from "react";

const UserDataContext = createContext();

const UserDataProvider =({children})=>{
  const [data, setData] = useState('');
  const [searchQuery, setSearchQuery] = useState("");

  return(
    <UserDataContext.Provider value={{data,setData,searchQuery,setSearchQuery}}>
        {children}
    </UserDataContext.Provider>
  )
}

export {UserDataContext, UserDataProvider};