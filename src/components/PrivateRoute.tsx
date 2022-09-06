import { useAuth } from '../hooks/useAuth';

interface Props {
  children: React.ReactElement;
}

export default function PrivateRoute({ children }: Props) {
  useAuth();

  return children;
}
