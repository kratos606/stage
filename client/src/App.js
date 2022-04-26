import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { User, Home, Login, AdminRoute, UserRoute, NotFound, Plan, History,HistoryUser } from './pages'
import axios from 'axios'
import './App.css'

axios.defaults.withCredentials = true;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3CB371',
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Routes>
            <Route exact path="/" element={<UserRoute />}>
              <Route index element={<Home/>}/>
              <Route exact path="history-user" element={<HistoryUser />}/>
            </Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/admin" element={<AdminRoute />}>
              <Route index element={<User/>}/>
              <Route exact path="history" element={<History/>}/>
              <Route exact path="plan" element={<Plan/>}/>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App