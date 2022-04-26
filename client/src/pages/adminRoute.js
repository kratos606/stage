import React,{useContext} from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import UserContext from '../hooks/userContext'
import { Loading } from '../components'

function AdminRoute() {
    const { user, isLoading } = useContext(UserContext);
    if(isLoading) {
        return <Loading/>
    }
    if(user){
        return user.isAdmin ? ( <Outlet />) : <Navigate to='/' replace/>
    } else {
        return <Navigate to='/login'/> 
    }
}

export default AdminRoute