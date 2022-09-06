import { Link as ReactRouterLink, useParams } from 'react-router-dom';
import {
  ActionIcon,
  Button,
  Container,
  CopyButton,
  Group,
  Tabs,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconArrowLeft, IconCopy, IconExternalLink } from '@tabler/icons';
import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/profile.service';
import { getProfileLinks } from '../services/link.service';
import { Profile } from '../types/profile.types';
import AppContainer from '../components/AppContainer';
import AppHeader from '../components/AppHeader';
import ProfileInfoForm from '../components/ProfileInfoForm';
import LinkList from '../components/LinkList';

export default function EditProfilePage() {
  const { id } = useParams();

  const { data: profile } = useQuery(
    ['profile', id],
    async () => await getProfile(id as string)
  );

  const { data: links } = useQuery(
    ['links'],
    async () => await getProfileLinks(id as string)
  );

  return (
    <AppContainer header={<AppHeader />}>
      <Container size="sm">
        <div className="space-y-8">
          <Group position="apart">
            <Group>
              <ActionIcon component={ReactRouterLink} to="/" variant="default">
                <IconArrowLeft size={16} />
              </ActionIcon>
              <Title order={2}>{profile?.profileName}</Title>
            </Group>
            <Group>
              <CopyButton
                value={`${window.location.origin}/${profile?.profileUsername}`}
                timeout={2000}
              >
                {({ copied, copy }) => (
                  <Tooltip
                    label={copied ? 'Copied' : 'Copy'}
                    withArrow
                    position="bottom"
                    color={copied ? 'green' : 'black'}
                  >
                    <Button
                      variant="default"
                      onClick={copy}
                      leftIcon={<IconCopy size={16} />}
                    >
                      Copy link
                    </Button>
                  </Tooltip>
                )}
              </CopyButton>
              <Button
                component="a"
                variant="default"
                target="_blank"
                rel="noopener noreferrer"
                href={`${window.location.origin}/${profile?.profileUsername}`}
                leftIcon={<IconExternalLink size={16} />}
              >
                View profile
              </Button>
            </Group>
          </Group>
          <Tabs defaultValue="profile">
            <Tabs.List grow>
              <Tabs.Tab value="profile">Profile</Tabs.Tab>
              <Tabs.Tab value="links">Links</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="profile" pt="lg">
              {profile && <ProfileInfoForm profile={profile} />}
            </Tabs.Panel>

            <Tabs.Panel value="links" pt="lg">
              {links && <LinkList links={links} profile={profile as Profile} />}
            </Tabs.Panel>
          </Tabs>
        </div>
      </Container>
    </AppContainer>
  );
}
