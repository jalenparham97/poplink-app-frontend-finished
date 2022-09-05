import { Link } from 'react-router-dom';
import { Avatar, Group, Paper, Text } from '@mantine/core';
import { Profile } from '../types/profile.types';
import { IconChevronRight } from '@tabler/icons';

interface Props {
  profile: Partial<Profile>;
}

export default function ProfileCard({ profile }: Props) {
  return (
    <Paper
      p="lg"
      radius="md"
      withBorder
      component={Link}
      to={`/profiles/${profile._id}`}
      className="hover:shadow-md"
    >
      <Group position="apart">
        <Group>
          <Avatar color="blue" radius="xl">
            {profile.profileName?.charAt(0)}
          </Avatar>
          <Text size="lg" className="font-semibold">
            {profile.profileName}
          </Text>
        </Group>

        <IconChevronRight />
      </Group>
    </Paper>
  );
}
