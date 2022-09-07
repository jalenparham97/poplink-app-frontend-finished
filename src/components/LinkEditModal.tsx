import {
  Button,
  Group,
  Modal,
  ModalProps,
  Stack,
  TextInput,
} from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { queryClient } from '../libs/react-query';
import { updateLink } from '../services/link.service';
import { Link } from '../types/link.types';

interface Props extends ModalProps {
  link: Link;
}

export default function LinkEditModal({ opened, onClose, link }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<Link>({
    defaultValues: {
      title: link?.title,
      url: link?.url,
    },
  });

  const updateLinkMutation = useMutation(updateLink, {
    onSuccess: () => {
      queryClient.invalidateQueries(['links']);
    },
  });

  const onSubmit = async (data: Partial<Link>) => {
    await updateLinkMutation.mutateAsync({
      id: link._id,
      data: { ...link, ...data },
    });
    onClose();
  };

  const resetClose = () => {
    reset({
      title: link?.title,
      url: link?.url,
    });
    onClose();
  };

  return (
    <Modal opened={opened} onClose={resetClose} title="Edit link">
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
              <Button variant="default" onClick={resetClose}>
                Cancel
              </Button>
              <Button type="submit" loading={isSubmitting}>
                Save
              </Button>
            </Group>
          </div>
        </Stack>
      </form>
    </Modal>
  );
}
