import { Link } from 'react-router-dom';
import { Header, Title } from '@mantine/core';
import AccountMenu from './AccountMenu';

export default function AppHeader() {
  return (
    <Header height={60} p="md">
      <div className="flex justify-between items-center h-full">
        <Link to="/" className="no-underline text-blue-600">
          <Title order={2}>PopLink</Title>
        </Link>

        <AccountMenu />
      </div>
    </Header>
  );
}
