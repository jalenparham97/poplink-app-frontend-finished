import { useState } from 'react';
import {
  Button,
  Group,
  Input,
  Modal,
  ModalProps,
  Stack,
  TextInput,
  Text,
  FileButton,
  Textarea,
} from '@mantine/core';

interface Props extends ModalProps {}

export default function ProfileCreateModal({ opened, onClose }: Props) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal opened={opened} onClose={onClose} title="Create profile">
      <form>
        <Stack spacing="sm">
          <Stack>
            <div>
              <Input.Wrapper label="Profile page URL">
                <div className="flex rounded-md mb-1 mt-[2px]">
                  <div
                    style={{ border: '1px solid' }}
                    className="inline-flex items-center px-3 rounded-l !border-r-0 !border-gray-400 bg-gray-50 text-gray-600 sm:text-sm"
                  >
                    {window.location.host}/
                  </div>
                  <TextInput
                    className="flex-1"
                    classNames={{
                      input: '!rounded-l-none !bg-white !text-black',
                    }}
                    placeholder="username"
                  />
                </div>
              </Input.Wrapper>
            </div>

            <div className="flex flex-col space-y-1">
              <Text component="label" size="sm" weight={500}>
                Profile image
              </Text>

              <div>
                <FileButton onChange={setFile} accept="image/png,image/jpeg">
                  {(props) => (
                    <Button variant="default" {...props} className="w-auto">
                      Upload image
                    </Button>
                  )}
                </FileButton>
              </div>
            </div>

            <TextInput label="Profile name" />
            <Textarea label="Profile description" autosize minRows={2} />
          </Stack>

          <div className="mt-2">
            <Group spacing="sm" position="right">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
              <Button>Create profile</Button>
            </Group>
          </div>
        </Stack>
      </form>
    </Modal>
  );
}
