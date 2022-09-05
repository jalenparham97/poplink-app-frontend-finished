import {
  AppShell,
  Avatar,
  Center,
  Container,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import ProfileLinkViewCard from '../components/ProfileLinkViewCard';
import { Link } from '../types/link.types';
import { Profile } from '../types/profile.types';

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

const links: Partial<Link>[] = [
  { _id: '1', title: 'Apple', url: 'https://apple.com' },
  { _id: '2', title: 'Google', url: 'https://www.google.com' },
];

export default function ProfileViewPage() {
  return (
    <AppShell
      styles={(theme) => ({
        main: {
          backgroundColor: theme.colors.gray[0],
        },
      })}
    >
      <Container size="xs">
        <Stack spacing="xl">
          <Center>
            <Avatar
              src={profile.profilePhotoUrl}
              alt="Profile image"
              color="blue"
              size={80}
              radius={100}
            >
              JP
            </Avatar>
          </Center>
          <div className="text-center">
            <Title order={3}>{profile.profileName}</Title>
            <Text size="xl">{profile.profileDescription}</Text>
          </div>
          <Stack spacing="xs">
            {links.map((link) => (
              <ProfileLinkViewCard link={link} />
            ))}
          </Stack>
        </Stack>
      </Container>
    </AppShell>
  );
}
