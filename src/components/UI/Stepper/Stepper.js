import {Step, StepLabel, Stepper as MuiStepper} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Stepper.module.scss';

const Stepper = ({steps, activeStep}) => {
  return (
    <div className={styles.stepper}>
      <MuiStepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </div>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string),
  activeStep: PropTypes.number
};

export default Stepper;
