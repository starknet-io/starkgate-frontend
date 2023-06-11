import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';

import {useFetchData} from '@hooks';

export const DynamicIcon = ({path, size}) => {
  const ImportedIconRef = useRef(null);
  const dataImage = path.startsWith('data:image');

  const fetchSVG = () => {
    if (dataImage) return null;
    if (path.includes('/')) {
      const paths = path.split('/');
      return import(`../../assets/svg/${paths[0]}/${paths[1]}.svg`);
    }
    return import(`../../assets/svg/${path}.svg`);
  };

  const {data, isLoading} = useFetchData(fetchSVG, [path]);

  useEffect(() => {
    if (data) {
      ImportedIconRef.current = data.default;
    }
  }, [data]);

  if (dataImage) {
    return <img alt={''} height={size} src={path} width={size} />;
  } else if (!isLoading && ImportedIconRef.current) {
    const {current: ImportedIcon} = ImportedIconRef;
    return <img alt="" height={size} src={ImportedIcon} width={size} />;
  }
  return null;
};

DynamicIcon.propTypes = {
  path: PropTypes.string,
  size: PropTypes.number
};
