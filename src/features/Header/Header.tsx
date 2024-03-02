import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  Container,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  useMantineTheme,
  Avatar,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLogout, IconChevronDown, IconSwitchHorizontal, IconSettings } from '@tabler/icons-react';
import classes from './Header.module.css';

import '@mantine/core/styles.css';

import logoImage from '../../images/DashBoardLogo.jpeg';
import { selectFirstName, selectLastName, selectLogged, selectProfileImage, selectUserEmail } from '../Presite/login/loginSlice';

export function Header() {
  const logged = useSelector(selectLogged);
  const userFirstName = useSelector(selectFirstName);
  const userLastName = useSelector(selectLastName);
  const userEmail = useSelector(selectUserEmail);
  const profile_image= useSelector(selectProfileImage)
  const user = {
    firstName: userFirstName,
    lastName: userLastName,
    email: userEmail,
    profile_image:profile_image,
  };
  const tabs = ['Patients', 'Appointments', 'Payments', 'Calendar', 'Reports'];
  const theme = useMantineTheme();
  const [opened, { toggle }] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);

  const navigate = useNavigate();

  const handleTabChange = (value:any) => {
    // Use react-router's useNavigate to update the route based on the selected tab
    navigate(`/App/Dashboard/${value.toLowerCase()}`);
  };

  const handleProfileClick = () => {
    navigate('/App/profile'); // Navigate to the Profile page
  };

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection} size="md">
        <Group justify="space-between">
          <img src={logoImage} alt="Logo" style={{ height: '90px' }} />
          Psychologist DashBoard App
          <Burger opened={opened} onClick={toggle} hiddenFrom="xs" size="sm" />
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: 'pop-top-right' }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <div className={classes.user} style={{border:"10px"}}>
              <img src={`http://127.0.0.1:8000${user.profile_image}`} alt="Profile"  style={{ width: '80px', height: 'auto' }} // Adjust the width as needed
/>

                <Group gap={7}>
                  <Text fw={500} size="sm" lh={1} mr={3}>
                    {user.firstName} {user.lastName}
                  </Text>
                  <IconChevronDown style={{ width: rem(12), height: rem(12) }} stroke={1.5} />
                </Group>
              </div>
            </Menu.Target>
            <Menu.Dropdown>
            <Menu.Item
            onClick={handleProfileClick}
               leftSection={
                <IconSettings style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
              }
              >


                Edit Profile
              </Menu.Item>
              <Menu.Item
                leftSection={<IconLogout style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
              >
                Logout
              </Menu.Item>

              <Menu.Divider />
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Container>
      <Container size="md">
        <Tabs
          defaultValue="Patients"
          variant="outline"
          visibleFrom="sm"
          classNames={{
            root: classes.tabs,
            list: classes.tabsList,
            tab: classes.tab,
          }}
          onChange={handleTabChange}
        >
          <Tabs.List>
            {tabs.map((tab) => (
              <Link
                to={`/App/Dashboard/${tab.toLowerCase()}`}
                key={tab}
                className={classes.tabLink}
              >
                <Tabs.Tab value={tab}>{tab}</Tabs.Tab>
              </Link>
            ))}
          </Tabs.List>
        </Tabs>
      </Container>
      
    </div>
  );
}
