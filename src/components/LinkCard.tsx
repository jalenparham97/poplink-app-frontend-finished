import { ActionIcon, Group, Paper, Stack, Text } from '@mantine/core';
import { Link } from '../types/link.types';
import { IconEdit, IconTrash } from '@tabler/icons';
import { useDisclosure } from '@mantine/hooks';
import { deleteLink } from '../services/link.service';
import { queryClient } from '../libs/react-query';
import { useMutation } from '@tanstack/react-query';
import LinkEditModal from './LinkEditModal';
import DeleteModal from './DeleteModal';

interface Props {
  link: Link;
}

export default function LinkCard({ link }: Props) {
  const [opened, handlers] = useDisclosure(false);
  const [deleteOpened, deleteHandlers] = useDisclosure(false);

  const deleteLinkMutation = useMutation(deleteLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(['links']);
    },
  });

  const onDelete = async () => {
    await deleteLinkMutation.mutateAsync(link?._id);
  };

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
            <ActionIcon
              variant="default"
              size="md"
              onClick={deleteHandlers.open}
            >
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

      <LinkEditModal opened={opened} onClose={handlers.close} link={link} />
      <DeleteModal
        title="link"
        opened={deleteOpened}
        onClose={deleteHandlers.close}
        onDelete={onDelete}
        isLoading={deleteLinkMutation.isLoading}
      />
    </Paper>
  );
}
