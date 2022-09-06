import { Avatar, Center, Container, Stack, Text, Title } from '@mantine/core';
import { getProfileByUsername } from '../services/profile.service';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getLinksByUsername } from '../services/link.service';
import AppContainer from '../components/AppContainer';
import ProfileLinkViewCard from '../components/ProfileLinkViewCard';

export default function ProfileViewPage() {
  const { profileUsername } = useParams();

  const { data: profile } = useQuery(
    ['profile', profileUsername],
    async () => await getProfileByUsername(profileUsername as string)
  );

  const { data: links } = useQuery(
    ['links', profileUsername],
    async () => await getLinksByUsername(profileUsername as string)
  );

  return (
    <AppContainer>
      <Container size="xs">
        <Stack spacing="xl">
          <Center>
            <Avatar
              src={profile?.profilePhotoUrl}
              alt="Profile image"
              color="blue"
              size={80}
              radius={100}
            >
              {profile?.profileName.charAt(0)}
            </Avatar>
          </Center>
          <div className="text-center">
            <Title order={3}>{profile?.profileName}</Title>
            <Text size="xl">{profile?.profileDescription}</Text>
          </div>
          <Stack spacing="xs">
            {links && links.map((link) => <ProfileLinkViewCard link={link} />)}
          </Stack>
        </Stack>
      </Container>
    </AppContainer>
  );
}
