

import * as React from 'react';
// import SideBar from '../../Component/SideBar
import SideBar from '../../Component/SideBar'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import SoftwareTeam from './TeamMember/SoftwareTeam';
import HumanResourceTeam from './TeamMember/HumanResourceTeam';
import ScmTeam from './TeamMember/ScmTeam';
import AllTeamMembers from './TeamMember/AllTeamMembers';

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
        <Typography variant="h5" >
             Team  Member
        </Typography>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginTop:"20px"}}>
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

