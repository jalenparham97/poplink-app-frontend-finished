import { Stack } from '@mantine/core';
import { Profile } from '../types/profile.types';
import ProfileCard from './ProfileCard';

interface Props {
  profiles: Profile[];
}

export default function ProfileList({ profiles }: Props) {
  return (
    <Stack spacing="xs">
      {profiles.map((profile) => (
        <ProfileCard profile={profile} />
      ))}
    </Stack>
  );
}
