import PropTypes from 'prop-types';

import {QueryClient, QueryClientProvider as UseQueryClientProvider} from '@tanstack/react-query';
import {ReactQueryDevtools} from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export const QueryClientProvider = ({children}) => {
  return (
    <>
      <UseQueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </UseQueryClientProvider>
    </>
  );
};

QueryClientProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};
