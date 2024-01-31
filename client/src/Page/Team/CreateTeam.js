import React from 'react'
import SideBar from '../../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


const CreateTeam = () => {
  return (
    <Box sx={{display:'flex'}}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <Typography variant="h5" sx={{textAlign:"center"}}>
             create Team
            </Typography>
          </Box>
        </Box>
  )
}

export default CreateTeam