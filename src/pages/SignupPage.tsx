import { Link } from 'react-router-dom';
import { Anchor, Paper, Title, Text, Container, Button } from '@mantine/core';
import AppContainer from '../components/AppContainer';

export default function SignupPage() {
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

          <Button fullWidth mt="xl" variant="default" size="lg">
            Sign up with Google
          </Button>
        </Paper>
      </Container>
    </AppContainer>
  );
}
