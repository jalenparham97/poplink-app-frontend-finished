import {
  Modal,
  Button,
  Group,
  ModalProps,
  Box,
  Text,
  Stack,
} from '@mantine/core';
interface Props extends ModalProps {
  isLoading?: boolean;
  onDelete: () => Promise<void>;
  size?: string | number;
}

export default function DeleteModal({
  opened,
  onClose,
  onDelete,
  isLoading,
  title,
  size = 'sm',
}: Props) {
  const handleDelete = async () => {
    try {
      await onDelete();
      if (!isLoading) {
        onClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={`Delete ${title}`}
      size={size}
    >
      <Stack>
        <Text>Are you sure you want to delete this {title}?</Text>

        <Box mt={15}>
          <Group spacing="sm" position="apart" grow>
            <Button variant="default" onClick={onClose}>
              Cancel
            </Button>
            <Button color="red" loading={isLoading} onClick={handleDelete}>
              Delete
            </Button>
          </Group>
        </Box>
      </Stack>
    </Modal>
  );
}
