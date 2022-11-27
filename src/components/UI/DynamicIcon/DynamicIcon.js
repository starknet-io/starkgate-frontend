import {useFetchData} from '@starkware-industries/commons-js-hooks';
import PropTypes from 'prop-types';
import React, {useEffect, useRef} from 'react';

export const DynamicIcon = ({path, size}) => {
  const ImportedIconRef = useRef(null);
  const {data, isLoading} = useFetchData(() => import(`../../../assets/svg/${path}`), [path]);

  useEffect(() => {
    if (data) {
      ImportedIconRef.current = data.default;
    }
  }, [data]);

  if (path.startsWith('data:image')) {
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
