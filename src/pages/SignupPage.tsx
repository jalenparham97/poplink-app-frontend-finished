import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import { signUpWithGoogle } from '../services/auth.service';
import { AuthContext } from '../context/auth.context';
import AppContainer from '../components/AppContainer';

export default function SignupPage() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignup = async () => {
    const user = await signUpWithGoogle();
    setUser(user);
    navigate('/');
  };

  return (
    <AppContainer>
      <Container size={420} my={100}>
        <Title color="blue" align="center">
          PopLink
        </Title>

        <Paper withBorder shadow="sm" p={30} mt={30} radius="md">
          <Title align="center">Create Account</Title>

          <Text color="dimmed" size="lg" align="center" mt={5}>
            Already have an account?{' '}
            <Anchor
              component={Link}
              to="/login"
              className="font-medium !no-underline"
            >
              Login
            </Anchor>
          </Text>

          <Button
            fullWidth
            mt="xl"
            variant="default"
            size="lg"
            onClick={handleSignup}
          >
            Sign up with Google
          </Button>
        </Paper>
      </Container>
    </AppContainer>
  );
}
