import PropTypes from 'prop-types';
import React from 'react';

import {Stepper as MuiStepper, Step, StepLabel} from '@mui/material';

import styles from './Stepper.module.scss';
import {StepperTheme} from './Stepper.theme';

export const Stepper = ({steps, activeStep}) => {
  return (
    <StepperTheme>
      <div className={styles.stepper}>
        <MuiStepper alternativeLabel activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </MuiStepper>
      </div>
    </StepperTheme>
  );
};

Stepper.propTypes = {
  steps: PropTypes.arrayOf(PropTypes.string),
  activeStep: PropTypes.number
};
