import { Menu, UnstyledButton, Avatar, Text } from '@mantine/core';
import { IconLogout, IconChevronDown } from '@tabler/icons';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { logout } from '../services/auth.service';

export default function AccountMenu() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <div>
      <Menu width={170} position="bottom-end" shadow="xl" transition="pop">
        <Menu.Target>
          <UnstyledButton className="w-full text-black flex items-center space-x-2">
            <Avatar
              color="blue"
              variant="filled"
              src={user?.photoURL}
              radius="xl"
            >
              {user?.displayName.charAt(0)}
            </Avatar>
            <Text className="font-semibold text-sm">{user?.displayName}</Text>
            <IconChevronDown size={16} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconLogout size={16} />} onClick={handleLogout}>
            Logout
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
