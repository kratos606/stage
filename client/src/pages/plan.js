import { Typography,Box } from '@mui/material'
import React from 'react'
import { ListPlans, SidebarAdmin } from '../components'

function Plan() {
  return (
    <Box sx={{minHeight: '100vh',width: '100vw',display: 'flex', flexDirection: 'row'}}>
      <SidebarAdmin/>
      <Box sx={{padding: '2rem',width:'100%'}}>
        <Typography 
          variant="h4"
          sx={{
            fontWeight: 'light',
          }}
        >
          Dashboard
        </Typography>
        <ListPlans style={{margin: '1rem',width:'100%'}}/>
      </Box>
    </Box>
    
  )
}

export default Plan