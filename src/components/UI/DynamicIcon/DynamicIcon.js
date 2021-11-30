import PropTypes from 'prop-types';
import React, {useEffect, useRef, useState} from 'react';

export const DynamicIcon = ({path, size}) => {
  const [loading, setLoading] = useState(false);
  const [, setError] = useState(null);
  const ImportedIconRef = useRef(null);

  useEffect(async () => {
    setLoading(true);
    const importIcon = async () => {
      try {
        ImportedIconRef.current = (await import(`../../../assets/svg/${path}`)).default;
      } catch (ex) {
        setError(ex);
      } finally {
        setLoading(false);
      }
    };
    await importIcon();
  }, [path]);

  if (!loading && ImportedIconRef.current) {
    const {current: ImportedIcon} = ImportedIconRef;
    return <img alt="" height={size} src={ImportedIcon} width={size} />;
  }
  return null;
};

DynamicIcon.propTypes = {
  path: PropTypes.string,
  size: PropTypes.number
};
