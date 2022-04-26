import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserContextProvider(props) {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  async function getUser() {
    try{
      const res = await axios.get(
        "http://localhost:5000/auth/check"
      );
      setUser(res.data.currentUser);
      setIsLoading(false);
    }
    catch(err){
      console.error(err);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getUser();
  },[]);

  return (
    <UserContext.Provider value={{ user, getUser,isLoading }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
export { UserContextProvider };