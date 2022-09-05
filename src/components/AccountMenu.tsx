import { Menu, UnstyledButton, Avatar, Text } from '@mantine/core';
import { IconLogout, IconChevronDown } from '@tabler/icons';

const user = {
  displayName: 'Jessica Page',
};

export default function AccountMenu() {
  // const user = useUser();
  // const logout = useLogout();

  return (
    <div>
      <Menu width={170} position="bottom-end" shadow="xl" transition="pop">
        <Menu.Target>
          <UnstyledButton className="w-full text-black">
            <div className="flex items-center space-x-2">
              <Avatar
                color="blue"
                variant="filled"
                // src={user?.photoUrl}
                radius="xl"
              >
                {/* {getInitials(`${user?.firstName} ${user?.lastName}`)} */}
                JP
              </Avatar>
              <Text className="font-semibold text-sm">{user.displayName}</Text>
              <IconChevronDown size={16} />
            </div>
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Item icon={<IconLogout size={16} />}>Logout</Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </div>
  );
}
