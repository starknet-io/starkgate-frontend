import PropTypes from 'prop-types';

import {useQuery} from '@tanstack/react-query';
import {Image} from '@ui';

export const DynamicIcon = ({path, size}) => {
  const isUrlPath = path.startsWith('data:image') || path.startsWith('https');
  const {data, isLoading} = useQuery({
    queryKey: ['dynamic_import', path],
    queryFn: () => import(`@assets/svg/${path}.svg`),
    refetchIntervalInBackground: false,
    staleTime: Infinity,
    enabled: !isUrlPath
  });

  if (isUrlPath) {
    return <Image height={size} src={path} width={size} />;
  } else if (!isLoading && data?.default) {
    return <Image forceSizes={true} height={size} src={data.default} width={size} />;
  }
  return null;
};

DynamicIcon.propTypes = {
  path: PropTypes.string,
  size: PropTypes.number
};
