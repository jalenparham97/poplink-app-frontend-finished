import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core';
import { Link } from '../types/link.types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import LinkEditModal from './LinkEditModal';

interface Props {
  link: Partial<Link>;
}

export default function LinkCard({ link }: Props) {
  const [opened, handlers] = useDisclosure(false);

  return (
    <Paper p="lg" radius="md" withBorder className="hover:shadow-md">
      <Stack spacing="xs">
        <Group position="apart">
          <Text size="lg" className="font-semibold">
            {link.title}
          </Text>

          <Group spacing="xs">
            <ActionIcon variant="default" size="md" onClick={handlers.open}>
              <IconEdit size={16} />
            </ActionIcon>
            <ActionIcon variant="default" size="md">
              <IconTrash className="text-red-600" size={16} />
            </ActionIcon>
          </Group>
        </Group>

        <div>
          <Text
            component="a"
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            className="!text-blue-600 no-underline hover:underline hover:underline-offset-4 font-medium"
          >
            {link.url}
          </Text>
        </div>
      </Stack>

      <LinkEditModal opened={opened} onClose={handlers.close} />
    </Paper>
  );
}
