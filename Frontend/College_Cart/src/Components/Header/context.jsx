import React, { createContext, useState } from "react";

const UserDataContext = createContext();

const UserDataProvider =({children})=>{
  const [data, setData] = useState('');
  const [searchQuery, setSearchQuery] = useState("");
  const [totalQuantity, setTotalQuantity] = useState(0)

  return(
    <UserDataContext.Provider value={{data,setData,searchQuery,setSearchQuery, totalQuantity, setTotalQuantity}}>
        {children}
    </UserDataContext.Provider>
  )
}

export {UserDataContext, UserDataProvider};