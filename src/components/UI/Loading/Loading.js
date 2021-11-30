import PropTypes from 'prop-types';
import React, {useEffect, useState} from 'react';

import {Keyframes} from '../KeyFrames/KeyFrames';
import './Loading.scss';

export const Loading = ({size, color}) => {
  const [keyFrameSize, setKeyFrameSize] = useState(size - size / 10);

  useEffect(() => {
    setKeyFrameSize(size - size / 10);
  }, [size]);

  return (
    <>
      <div
        className="lds-ripple"
        style={{width: `${size}px`, height: `${size}px`, borderColor: color}}
      >
        <div style={{borderColor: color}} />
        <div style={{borderColor: color}} />
      </div>
      <Keyframes
        _0={{
          top: `${keyFrameSize / 2}px`,
          left: `${keyFrameSize / 2}px`,
          width: 0,
          height: 0,
          opacity: 1
        }}
        _100={{
          top: '0px',
          left: '0px',
          width: `${keyFrameSize}px`,
          height: `${keyFrameSize}px`,
          opacity: 0
        }}
        name="lds-ripple"
      />
    </>
  );
};

Loading.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string
};
