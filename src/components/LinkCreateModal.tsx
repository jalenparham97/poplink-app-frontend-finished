import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from '@mantine/core';

interface Props extends ModalProps {}

export default function LinkCreateModal({ opened, onClose }: Props) {
  return (
    <Modal opened={opened} onClose={onClose} title="Create link">
      <form>
        <Stack spacing="sm">
          <TextInput label="Title" placeholder="Website" />
          <TextInput label="URL" placeholder="https://www.yourwebsite.com" />

          <div className="mt-2">
            <Group spacing="sm" position="right">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
              <Button>Create link</Button>
            </Group>
          </div>
        </Stack>
      </form>
    </Modal>
  );
}
