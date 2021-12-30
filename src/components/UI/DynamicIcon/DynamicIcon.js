import PropTypes from 'prop-types';
import React, {useCallback, useEffect, useRef} from 'react';

import {useFetchData} from '../../../hooks';

export const DynamicIcon = ({path, size}) => {
  const ImportedIconRef = useRef(null);
  const {data, isLoading} = useFetchData(
    useCallback(() => import(`../../../assets/svg/${path}`), [path]),
    path
  );

  useEffect(() => {
    if (data) {
      ImportedIconRef.current = data.default;
    }
  }, [data]);

  if (!isLoading && ImportedIconRef.current) {
    const {current: ImportedIcon} = ImportedIconRef;
    return <img alt="" height={size} src={ImportedIcon} width={size} />;
  }
  return null;
};

DynamicIcon.propTypes = {
  path: PropTypes.string,
  size: PropTypes.number
};
