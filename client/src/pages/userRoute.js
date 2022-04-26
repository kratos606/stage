import React,{useContext} from 'react'
import {Outlet,Navigate} from 'react-router-dom'
import UserContext from '../hooks/userContext';
import {Loading} from '../components';

function UserRoute() {
  const {user,isLoading} = useContext(UserContext);
  if(isLoading){
    return <Loading />;
  }
  if(user){
    return user.isAdmin ? <Navigate to='/admin' replace/> : (<Outlet />)
  } else {
    return <Navigate to='/login' replace/> 
  }
}

export default UserRoute