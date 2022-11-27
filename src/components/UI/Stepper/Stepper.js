import {Step, StepLabel, Stepper as MuiStepper} from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Stepper.module.scss';
import {StepperTheme} from './Stepper.theme';

const Stepper = ({steps, activeStep}) => {
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

export default Stepper;
