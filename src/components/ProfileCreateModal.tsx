import { useContext, useState } from 'react';
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
  Image,
} from '@mantine/core';
import { Profile } from '../types/profile.types';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../libs/react-query';
import { addProfile } from '../services/profile.service';
import { AuthContext } from '../context/auth.context';
import { uploadFile } from '../services/storage.service';

interface Props extends ModalProps {}

export default function ProfileCreateModal({ opened, onClose }: Props) {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState<File | null>(null);
  const [previewImgUrl, setPreviewImgUrl] = useState('');
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Profile>();

  const addProfileMutation = useMutation(addProfile, {
    onSuccess: () => {
      queryClient.invalidateQueries(['profiles']);
    },
  });

  const onSubmit = async (data: Partial<Profile>) => {
    let profilePhotoUrl = '';
    if (file) {
      profilePhotoUrl = await uploadFile(file, user?._id);
    }
    await addProfileMutation.mutateAsync({
      userId: user?._id,
      profilePhotoUrl,
      ...data,
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFileChange = (file: File) => {
    setFile(file);
    setPreviewImgUrl(URL.createObjectURL(file));
  };

  const removeImage = () => {
    setFile(null);
    setPreviewImgUrl('');
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Create profile">
      <form>
        <Stack spacing="sm">
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

          <div className="mt-2">
            <Group spacing="sm" position="right">
              <Button variant="default" onClick={handleClose}>
                Cancel
              </Button>
              <Button onClick={handleSubmit(onSubmit)} loading={isSubmitting}>
                Create profile
              </Button>
            </Group>
          </div>
        </Stack>
      </form>
    </Modal>
  );
}
