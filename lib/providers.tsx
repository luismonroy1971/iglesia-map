'use client';

/* Core */
import { Provider } from 'react-redux';

/* Instruments */
import { store } from '@/lib/redux';
import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

export const Providers = (props: React.PropsWithChildren) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        {props.children}
      </QueryClientProvider>
    </Provider>
  );
};
