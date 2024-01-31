// import React from 'react';
// import SideBar from '../../Component/SideBar';
// import Box from '@mui/material/Box';
// import Typography from '@mui/material/Typography';

// import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
// import { useTheme } from '@mui/material/styles';
// import AppBar from '@mui/material/AppBar';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';

// import Zoom from '@mui/material/Zoom';
// import Fab from '@mui/material/Fab';
// import AddIcon from '@mui/icons-material/Add';
// import EditIcon from '@mui/icons-material/Edit';
// import UpIcon from '@mui/icons-material/KeyboardArrowUp';
// import { green } from '@mui/material/colors';


// function TabPanel(props) {
//   const { children, value, index, ...other } = props;

//   return (
//     <Typography
//       component="div"
//       role="tabpanel"
//       hidden={value !== index}
//       id={`action-tabpanel-${index}`}
//       aria-labelledby={`action-tab-${index}`}
//       {...other}
//     >
//       {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
//     </Typography>
//   );
// }

// TabPanel.propTypes = {
//   children: PropTypes.node,
//   index: PropTypes.number.isRequired,
//   value: PropTypes.number.isRequired,
// };

// function a11yProps(index) {
//   return {
//     id: `action-tab-${index}`,
//     'aria-controls': `action-tabpanel-${index}`,
//   };
// }

// const fabStyle = {
//   position: 'absolute',
//   bottom: 16,
//   right: 16,
// };

// const fabGreenStyle = {
//   color: 'common.white',
//   bgcolor: green[500],
//   '&:hover': {
//     bgcolor: green[600],
//   },
// };


// const TeamMember = () => {
//     const theme = useTheme();
//     const [value, setValue] = React.useState(0);
  
//     const handleChange = (event, newValue) => {
//       setValue(newValue);
//     };
  
//     const handleChangeIndex = (index) => {
//       setValue(index);
//     };
  
//     const transitionDuration = {
//       enter: theme.transitions.duration.enteringScreen,
//       exit: theme.transitions.duration.leavingScreen,
//     };
  
//     const fabs = [
//       {
//         color: 'primary',
//         sx: fabStyle,
//         icon: <AddIcon />,
//         label: 'Add',
//       },
//       {
//         color: 'secondary',
//         sx: fabStyle,
//         icon: <EditIcon />,
//         label: 'Edit',
//       },
//       {
//         color: 'inherit',
//         sx: { ...fabStyle, ...fabGreenStyle },
//         icon: <UpIcon />,
//         label: 'Expand',
//       },
//     ];


//   return (
//     <Box sx={{display:'flex'}}>
//     <SideBar />
//     <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
//       <Typography variant="h5">
//        Team Member
//       </Typography>
//       <div>
//           <Box
//       sx={{
//         bgcolor: 'background.paper',
//         width: 500,
//         position: 'relative',
//         minHeight: 200,
//       }}
//     >
//       <AppBar position="static" color="default">
//         <Tabs
//           value={value}
//           onChange={handleChange}
//           indicatorColor="primary"
//           textColor="primary"
//           variant="fullWidth"
//           aria-label="action tabs example"
//         >
//           <Tab label="Item One" {...a11yProps(0)} />
//           <Tab label="Item Two" {...a11yProps(1)} />
//           <Tab label="Item Three" {...a11yProps(2)} />
//         </Tabs>
//       </AppBar>
//       <SwipeableViews
//         axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
//         index={value}
//         onChangeIndex={handleChangeIndex}
//       >
//         <TabPanel value={value} index={0} dir={theme.direction}>
//           Item One
//         </TabPanel>
//         <TabPanel value={value} index={1} dir={theme.direction}>
//           Item Two
//         </TabPanel>
//         <TabPanel value={value} index={2} dir={theme.direction}>
//           Item Three
//         </TabPanel>
//       </SwipeableViews>
//       {fabs.map((fab, index) => (
//         <Zoom
//           key={fab.color}
//           in={value === index}
//           timeout={transitionDuration}
//           style={{
//             transitionDelay: `${value === index ? transitionDuration.exit : 0}ms`,
//           }}
//           unmountOnExit
//         >
//           <Fab sx={fab.sx} aria-label={fab.label} color={fab.color}>
//             {fab.icon}
//           </Fab>
//         </Zoom>
//       ))}
//     </Box>
//       </div>
//     </Box>
//   </Box>
//   )
// }

// export default TeamMember


import * as React from 'react';
import SideBar from '../../Component/SideBar'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SoftwareTeam from './SoftwareTeam';
import HumanResourceTeam from './HumanResourceTeam';
import ScmTeam from './ScmTeam';
import AllTeamMembers from './AllTeamMembers';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3}}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function TeamMember() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    
    <Box sx={{ width: '100%',display:'flex' }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
        <Typography variant="h5" sx={{textAlign:"center", margin:"10px"}}>
             Team  Member
        </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider'}}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" >
        <Tab label="ALL" {...a11yProps(0)} />
          <Tab label="Software" {...a11yProps(1)} />
          <Tab label="Human Resource" {...a11yProps(2)} />
          <Tab label="SCM" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
       <AllTeamMembers/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
       <SoftwareTeam/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <HumanResourceTeam/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <ScmTeam/>
      </CustomTabPanel>
      </Box>
    </Box>
  );
}

