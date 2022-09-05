import {
  QueryClient,
  QueryClientProvider as ReactQueryClientProvider,
} from '@tanstack/react-query';

export { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient();

interface Props {
  children: React.ReactNode;
}

export const QueryClientProvider = ({ children }: Props) => {
  return (
    <ReactQueryClientProvider client={queryClient}>
      {children}
    </ReactQueryClientProvider>
  );
};
