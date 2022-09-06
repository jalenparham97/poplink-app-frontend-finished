import { useContext, useState } from 'react';
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
  Image,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconDeviceFloppy, IconTrash } from '@tabler/icons';
import { Profile } from '../types/profile.types';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../context/auth.context';
import { uploadFile } from '../services/storage.service';
import { queryClient } from '../libs/react-query';
import { useMutation } from '@tanstack/react-query';
import { deleteProfile, updateProfile } from '../services/profile.service';
import { useNavigate } from 'react-router-dom';
import DeleteModal from './DeleteModal';

interface Props {
  profile: Profile;
}

export default function ProfileInfoForm({ profile }: Props) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [deleteOpened, deleteHandlers] = useDisclosure(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState(profile.profilePhotoUrl);
  const [hasFileChanged, setHasFileChanged] = useState(
    previewImgUrl !== profile.profilePhotoUrl
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty },
  } = useForm<Profile>({
    defaultValues: {
      profileUsername: profile?.profileUsername,
      profileName: profile?.profileName,
      profileDescription: profile?.profileDescription,
    },
  });

  const updateProfileMutation = useMutation(updateProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profiles']);
    },
  });

  const deleteProfileMutation = useMutation(deleteProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profiles']);
    },
  });

  const onSubmit = async (data: Partial<Profile>) => {
    let profilePhotoUrl = previewImgUrl;
    if (file) {
      profilePhotoUrl = await uploadFile(file, user?._id);
    }
    await updateProfileMutation.mutateAsync({
      id: profile?._id,
      data: {
        userId: user?._id,
        profilePhotoUrl,
        ...data,
      },
    });
    setHasFileChanged(false);
    reset();
  };

  const onDelete = async () => {
    await deleteProfileMutation.mutateAsync(profile?._id);
    navigate('/');
  };

  const handleFileChange = (file: File) => {
    setFile(file);
    setPreviewImgUrl(URL.createObjectURL(file));
    setHasFileChanged(true);
  };

  const removeImage = () => {
    setFile(null);
    setPreviewImgUrl('');
    setHasFileChanged(true);
  };

  return (
    <Stack spacing="lg">
      <Paper p="lg" radius="md" withBorder>
        <Stack>
          <Title order={4}>Profile info</Title>
          <Stack>
            <div>
              <Input.Wrapper
                label="Profile username"
                withAsterisk
                error={errors.profileUsername && 'Profile username is required'}
              >
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
                    {...register('profileUsername', { required: true })}
                  />
                </div>
              </Input.Wrapper>
            </div>

            <div className="flex flex-col space-y-1">
              <Text component="label" size="sm" weight={500}>
                Profile image
              </Text>

              <Group>
                {previewImgUrl && (
                  <Image width={100} radius="md" src={previewImgUrl} />
                )}
                {previewImgUrl && (
                  <Button variant="default" onClick={removeImage}>
                    Remove image
                  </Button>
                )}
                {!previewImgUrl && (
                  <FileButton
                    onChange={handleFileChange}
                    accept="image/png,image/jpeg"
                  >
                    {(props) => (
                      <Button variant="default" {...props} className="w-auto">
                        Upload image
                      </Button>
                    )}
                  </FileButton>
                )}
              </Group>
            </div>

            <TextInput
              label="Profile name"
              withAsterisk
              {...register('profileName', { required: true })}
              error={errors.profileName && 'Profile name is required'}
            />
            <Textarea
              label="Profile description"
              autosize
              minRows={2}
              {...register('profileDescription')}
            />
          </Stack>
        </Stack>
      </Paper>

      <Divider />

      <Group position="apart">
        <Button
          color="red"
          variant="outline"
          leftIcon={<IconTrash size={16} />}
          onClick={deleteHandlers.open}
        >
          Delete profile
        </Button>

        <Button
          leftIcon={<IconDeviceFloppy size={16} />}
          onClick={handleSubmit(onSubmit)}
          loading={isSubmitting}
          disabled={!isDirty && !hasFileChanged}
        >
          Save
        </Button>
      </Group>

      <DeleteModal
        title="profile"
        opened={deleteOpened}
        onClose={deleteHandlers.close}
        onDelete={onDelete}
        isLoading={deleteProfileMutation.isLoading}
      />
    </Stack>
  );
}
