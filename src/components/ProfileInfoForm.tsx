import { useState } from 'react';
import {
  Paper,
  Title,
  Text,
  Stack,
  TextInput,
  Group,
  Textarea,
  FileButton,
  Button,
  Divider,
  Input,
} from '@mantine/core';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons';

export default function ProfileInfoForm() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Stack spacing="lg">
      <Paper p="lg" radius="md" withBorder>
        <Stack>
          <Title order={4}>Profile info</Title>
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
        </Stack>
      </Paper>

      <Divider />

      <Group position="apart">
        <Button
          color="red"
          variant="outline"
          leftIcon={<IconTrash size={16} />}
        >
          Delete profile
        </Button>

        <Button leftIcon={<IconDeviceFloppy size={16} />}>Save</Button>
      </Group>
    </Stack>
  );
}
