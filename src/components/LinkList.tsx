import { Button, Group, Stack, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons';
import { Link } from '../types/link.types';
import LinkCard from './LinkCard';
import LinkCreateModal from './LinkCreateModal';

interface Props {
  links: Link[];
}

export default function LinkList({ links }: Props) {
  const [opened, handlers] = useDisclosure(false);

  return (
    <Stack spacing="xl">
      <Group position="apart">
        <Title order={3}>Links</Title>
        <Button leftIcon={<IconPlus size={16} />} onClick={handlers.open}>
          Add link
        </Button>
      </Group>

      <Stack spacing="xs">
        {links.map((link) => (
          <LinkCard link={link} />
        ))}
      </Stack>

      <LinkCreateModal opened={opened} onClose={handlers.close} />
    </Stack>
  );
}
