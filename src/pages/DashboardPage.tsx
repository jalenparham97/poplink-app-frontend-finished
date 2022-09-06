import { Button, Container, Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import { useQuery } from '@tanstack/react-query';
import { getUserProfiles } from '../services/profile.service';
import AppContainer from '../components/AppContainer';
import AppHeader from '../components/AppHeader';
import ProfileList from '../components/ProfileList';
import ProfileCreateModal from '../components/ProfileCreateModal';

export default function DashboardPage() {
  const { user } = useContext(AuthContext);
  const [opened, handlers] = useDisclosure(false);

  const profiles = useQuery(
    ['profiles', user?._id],
    async () => await getUserProfiles(user?._id as string)
  );

  return (
    <AppContainer header={<AppHeader />}>
      <Container size="sm">
        <Stack spacing="xl">
          <Group position="apart">
            <Title order={2}>Profiles</Title>
            <Button leftIcon={<IconPlus size={16} />} onClick={handlers.open}>
              Create profile
            </Button>
          </Group>

          {profiles.data && <ProfileList profiles={profiles.data} />}
        </Stack>
      </Container>

      <ProfileCreateModal opened={opened} onClose={handlers.close} />
    </AppContainer>
  );
}
