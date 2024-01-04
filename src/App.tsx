// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { Route, Routes } from 'react-router-dom';

import {  IconUserCircle, IconCategory2 } from '@tabler/icons-react';

import { useDisclosure } from '@mantine/hooks';
import { MantineProvider, AppShell, Burger, Group,rem, UnstyledButton, Menu } from '@mantine/core';
import MainPage from './pages/main';
import DashboardPage from './pages/dashboard';
import StoryPage from './pages/storypage';
import CategoryPage from './pages/category';

export default function App() {

  const Categoryicon = <IconCategory2 style={{ width: rem(25), height: rem(25) }} />;
  const Usericon = <IconUserCircle style={{ width: rem(25), height: rem(25) }} />;

  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(false);

  return (
    <MantineProvider
      theme={{
        colors: {
          'main-yellow': ["#fff9e0", "#fff2ca", "#ffe399", "#ffd462", "#ffc736", "#ffbf18", "#ffbb02", "#e4a400", "#ca9200", "#af7c00"],
          'wine-red': ["#fbeef2", "#f2dae1", "#e7b0c1", "#dc849e", "#d45f81", "#cf496f", "#cf3d66", "#b73056", "#a3294c", "#901e41"],
          'bright-pink': ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82', '#AD1374'],
        },
      }}>
      <AppShell
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: 'sm',
          collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
        }}
      >
        <AppShell.Header color="rgba(255, 201, 59, 1)" >
          <Group h="100%" px="md" justify="space-between" bg="main-yellow">
            <Group>
              <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom="sm" size="sm" />
              <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom="sm" size="sm" />
              SERCH STORY
            </Group>
            <Group gap="xl" px="md">
              <Menu width={200} shadow="md" >
                <Menu.Target>
                  <UnstyledButton>
                    <Group>
                      {Categoryicon}Category
                    </Group>
                  </UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown bg="#521125">
                  <Menu.Item component="a" href={`/Category/Anime`} color='white'>
                    Anime
                  </Menu.Item>
                  <Menu.Item component="a" href={`/Category/TV Series`} color='white'>
                    TV Series
                  </Menu.Item>
                  <Menu.Item component="a" href={`/Category/Online Program`} color='white'>
                    Online Program
                  </Menu.Item>
                  <Menu.Item component="a" href={`/Category/Podcast`} color='white'>
                    Podcast
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              <Menu width={200} shadow="md">
                <Menu.Target>
                  <UnstyledButton>{Usericon}</UnstyledButton>
                </Menu.Target>

                <Menu.Dropdown bg="#521125">
                  <Menu.Item component="a" href="/Dashboard" color='white'>
                    veiw profile
                  </Menu.Item>
                  <Menu.Item
                    component="a"
                    href="https://mantine.dev"
                    color='white'
                  >
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>

            </Group>
          </Group>

        </AppShell.Header>

        <AppShell.Navbar
          bg="#521125">
        </AppShell.Navbar>

        <Routes>
          <Route path='/' element={<MainPage />}></Route>
          <Route path='/Dashboard' element={<DashboardPage />}></Route>
          <Route path='/Dashboard/:id' element={<StoryPage isAdmin={true}/>}></Route>
          <Route path='/Category/:id' element={<CategoryPage/>}></Route>
          <Route path='/Story/:id' element={<StoryPage isAdmin={false}/>}></Route>
        </Routes>

      </AppShell>
    </MantineProvider>);
}