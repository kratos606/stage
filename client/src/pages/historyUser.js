import { Typography,Box } from '@mui/material'
import React from 'react'
import { Histories , SidebarUser } from '../components'

function HistoryUser() {
  return (
    <Box sx={{minHeight: '100vh',width: '100vw',display: 'flex', flexDirection: 'row'}}>
      <SidebarUser/>
      <Box sx={{padding: '2rem',width:'100%'}}>
        <Typography 
          variant="h4"
          sx={{
            fontWeight: 'light',
          }}
        >
          Dashboard
        </Typography>
        <Histories style={{margin: '1rem',width:'100%'}}/>
      </Box>
    </Box>
    
  )
}

export default HistoryUser