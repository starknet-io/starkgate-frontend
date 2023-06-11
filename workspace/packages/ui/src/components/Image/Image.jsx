import PropTypes from 'prop-types';
import React from 'react';

import {useConstants} from '@hooks';

export const Image = ({name, project = 'commons', ...props}) => {
  const {S3_ASSETS_BUCKET_URL} = useConstants();
  const path = `${S3_ASSETS_BUCKET_URL}/${project}/img/${name}.png`;

  return <img alt="" src={path} {...props} />;
};

Image.propTypes = {
  name: PropTypes.string,
  project: PropTypes.string
};
