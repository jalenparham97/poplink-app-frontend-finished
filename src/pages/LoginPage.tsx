import { Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import { Link } from 'react-router-dom';
import AppContainer from '../components/AppContainer';

export default function LoginPage() {
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

          <Button fullWidth mt="xl" variant="default" size="lg">
            Login with Google
          </Button>
        </Paper>
      </Container>
    </AppContainer>
  );
}
