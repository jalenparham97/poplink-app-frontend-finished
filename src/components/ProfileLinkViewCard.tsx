import { Paper, Text } from '@mantine/core';
import { Link } from '../types/link.types';

interface Props {
  link: Partial<Link>;
}

export default function ProfileLinkViewCard({ link }: Props) {
  return (
    <Paper
      p="lg"
      radius="md"
      withBorder
      component="a"
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="hover:shadow-md"
    >
      <Text size="lg" align="center" className="font-semibold">
        {link.title}
      </Text>
    </Paper>
  );
}
