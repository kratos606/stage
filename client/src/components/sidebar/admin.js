import React from 'react'
import { PeopleAltOutlined,LogoutOutlined } from '@mui/icons-material';
import { Button,Box, Drawer,List,ListItem,ListItemIcon, ListItemText, Typography } from '@mui/material'
import MapIcon from '@mui/icons-material/Map';
import HistoryIcon from '@mui/icons-material/History';
import { Link } from "react-router-dom";
import axios from 'axios';

const drawerWidth = 240;

function SidebarAdmin() {
  const logout = async() => {
    await axios.get('http://localhost:5000/auth/logout').then(res => {
      window.location = '/login';
    }).catch(err => console.log(err))
  }
  return (
    <Drawer
        variant="permanent"
        anchor="left"
        open
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            paddingInline: '1rem',
            backgroundColor: "#16191C",
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignContent:'space-between',
          flexWrap: 'wrap',
          width: '100%',
          height: '100%',
        }}
      >
        <Box sx={{width: '100%'}}>
          <Link style={{all:'unset',cursor:'pointer'}} to="/admin"><Typography variant='h4' sx={{paddingBlock:4,paddingInline:2,color:'MediumSeaGreen',fontWeight:'bold'}}>
            PlanOS
          </Typography></Link>
        </Box>
        <List sx={{width: '100%'}}>
            <Link style={{all:'unset'}} to="/admin"><ListItem button>
              <ListItemIcon><PeopleAltOutlined sx={{color:'#3CB371'}}/></ListItemIcon>
              <ListItemText primary={"Users"} />
            </ListItem></Link>
            <Link style={{all:'unset'}} to="/admin/plan"><ListItem button>
              <ListItemIcon><MapIcon sx={{color:'#3CB371'}}/></ListItemIcon>
              <ListItemText primary={"Plans"} />
            </ListItem></Link>
            <Link style={{all:'unset'}} to="/admin/history"><ListItem button>
              <ListItemIcon><HistoryIcon sx={{color:'#3CB371'}}/></ListItemIcon>
              <ListItemText primary={"Histories"} />
            </ListItem></Link>
        </List>
        <Button onClick={logout} sx={{width: '100%',justifySelf:'center',marginBlockEnd:'20px'}}><LogoutOutlined /></Button>
      </Box>
    </Drawer>
  )
}
export default SidebarAdmin