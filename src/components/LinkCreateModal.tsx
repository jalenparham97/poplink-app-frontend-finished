import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { queryClient } from '../libs/react-query';
import { addLink } from '../services/link.service';
import { Link } from '../types/link.types';
import { Profile } from '../types/profile.types';

interface Props extends ModalProps {
  profile: Profile;
}

export default function LinkCreateModal({ opened, onClose, profile }: Props) {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Link>();

  const addLinkMutation = useMutation(addLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(['links']);
    },
  });

  const onSubmit = async (data: Partial<Link>) => {
    await addLinkMutation.mutateAsync({
      userId: user?._id,
      profileId: id as string,
      profileUsername: profile?.profileUsername,
      ...data,
    });
    handleClose();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleClose} title="Create link">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing="sm">
          <TextInput
            label="Title"
            placeholder="Website"
            {...register('title', { required: true })}
            error={errors.title && 'Title is required'}
          />
          <TextInput
            label="URL"
            placeholder="https://www.yourwebsite.com"
            {...register('url', { required: true })}
            error={errors.url && 'URL is required'}
          />

          <div className="mt-2">
            <Group spacing="sm" position="right">
              <Button variant="default" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Create link
              </Button>
            </Group>
          </div>
        </Stack>
      </form>
    </Modal>
  );
}
