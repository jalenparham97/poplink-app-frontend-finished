import { Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithGoogle } from '../services/auth.service';
import { useContext } from 'react';
import { AuthContext } from '../context/auth.context';
import AppContainer from '../components/AppContainer';

export default function LoginPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async () => {
    const user = await loginWithGoogle();
    if (user) {
      navigate('/');
    }
  };

  if (user) {
    navigate('/');
  }

  return (
    <AppContainer>
      <Container size={420} my={100}>
        <Title color="blue" align="center">
          PopLink
        </Title>

        <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
          <Title align="center">Welcome back!</Title>
          <Text color="dimmed" size="lg" align="center" mt={5}>
            Don't have an account yet?{' '}
            <Anchor
              component={Link}
              to="/signup"
              className="font-medium !no-underline"
            >
              Sign up
            </Anchor>
          </Text>

          <Button
            fullWidth
            mt="xl"
            variant="default"
            size="lg"
            onClick={handleLogin}
          >
            Login with Google
          </Button>
        </Paper>
      </Container>
    </AppContainer>
  );
}
