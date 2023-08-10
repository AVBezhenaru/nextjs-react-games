import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import {
  Tabs,
  Tab,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';

import Info from './info';
import InfoEditForm from './infoEditForm';
import Activity from './activity';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const ProfileTabs = () => {
  const [value, setValue] = useState(0);
  const currentUser = useCookies(['user'])[0].user;
  const [editInfo, setEditInfo] = useState(false);
  const friends = ['friend', 'friend', 'friend'];
  const groups = ['Команда мечты', 'Здесь вам не тут', 'Только свои'];

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    currentUser && (
      <Box sx={{ width: '100%', backgroundColor: 'white', borderRadius: '10px', mb: '1.5rem' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" centered>
            <Tab label="Overview" {...a11yProps(0)} />
            <Tab label="Info" {...a11yProps(1)} />
            <Tab label="Activity" {...a11yProps(2)} />
            <Tab label="Friends" {...a11yProps(3)} />
            <Tab label="Group" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Typography>Перед тобой профиль человека, который однажды войдет в историю.</Typography>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          {editInfo ? (
            <InfoEditForm setEditInfo={setEditInfo} />
          ) : (
            <Info setEditInfo={setEditInfo} />
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Activity />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={3}>
          <Typography variant="h5">My friend</Typography>
          <List>
            {friends.map((friend, i) => (
              <ListItem key={i}>
                <ListItemButton>
                  <ListItemText primary={friend} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={4}>
          <Typography variant="h5">Are you in groups</Typography>
          <List>
            {groups.map((group) => (
              <ListItem key={group}>
                <ListItemButton>
                  <ListItemText primary={group} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </CustomTabPanel>
      </Box>
    )
  );
};

export default ProfileTabs;
