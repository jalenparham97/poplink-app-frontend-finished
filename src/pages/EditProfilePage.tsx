import {
  Button,
  Container,
  CopyButton,
  Group,
  Tabs,
  Title,
  Tooltip,
} from '@mantine/core';
import { IconCopy, IconExternalLink } from '@tabler/icons';
import { Profile } from '../types/profile.types';
import { Link } from '../types/link.types';
import AppContainer from '../components/AppContainer';
import AppHeader from '../components/AppHeader';
import ProfileInfoForm from '../components/ProfileInfoForm';
import LinkList from '../components/LinkList';

const links: Link[] = [
  {
    _id: '1',
    title: 'Apple',
    url: 'https://apple.com',
    profileOwner: 'jessicapage',
    userId: '631552e0a49f6866c6a1d3a8',
  },
  {
    _id: '2',
    title: 'Google',
    url: 'https://www.google.com',
    profileOwner: 'jessicapage',
    userId: '631552e0a49f6866c6a1d3a8',
  },
];

const profile: Profile = {
  _id: '63155369a49f6866c6a1d3ab',
  userId: '631552e0a49f6866c6a1d3a8',
  slug: 'jessicapage',
  profileName: 'Jessica Page',
  profileDescription: 'Freelance Web Developer',
  profilePhotoUrl:
    'https://lh3.googleusercontent.com/a/AATXAJwM-FTxP8rCqsWNQXcyMkKj79NvY5UM8luqz8ET=s96-c',
  createdAt: '2022-09-05T01:39:53.031Z',
  updatedAt: '2022-09-05T01:39:53.031Z',
};

export default function EditProfilePage() {
  return (
    <AppContainer header={<AppHeader />}>
      <Container size="sm">
        <div className="space-y-8">
          <Group position="apart">
            <Title order={2}>{profile.profileName}</Title>
            <Group>
              <CopyButton
                value={`${window.location.origin}/${profile.slug}`}
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
                href={`${window.location.origin}/${profile.slug}`}
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
              <ProfileInfoForm />
            </Tabs.Panel>

            <Tabs.Panel value="links" pt="lg">
              <LinkList links={links} />
            </Tabs.Panel>
          </Tabs>
        </div>
      </Container>
    </AppContainer>
  );
}
