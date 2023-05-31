import {
    Button,
    CircularProgress,
    lighten,
    Step,
    StepContent,
    StepLabel,
    Stepper,
    Typography
  } from '@mui/material';
  
  import React, { useCallback, useEffect, useRef, useState } from 'react';
  
  const Steps = ({ onDone, steps, submitText }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState(null);
    const [execing, setExecing] = useState(false);
    const [loading, setLoading] = useState(false);
    const stepsRef = useRef(steps);
  
    useEffect(() => {
      stepsRef.current = steps;
    }, [steps]);
  
    const nextStep = useCallback(() => {
      setError(null);
      setStatus(null);
  
      setActiveStep(activeStep + 1);
    }, [activeStep]);
  
    const report = useCallback((error, loading, message) => {
      if (error) {
        setError(error);
      } else {
        setStatus({ loading, message });
      }
    }, []);
  
    useEffect(() => {
      if (!execing) return;
  
      if (activeStep >= stepsRef.current.length) return;
  
      if (stepsRef.current[activeStep].paused) {
        setExecing(false);
  
        return;
      }
  
      setStatus({ loading: true });
      stepsRef.current[activeStep]
        .exec(report)
        .then(() => {
          nextStep();
        })
        .catch((error) => {
          report(error);
          setExecing(false);
        })
        .finally(() => {
          setStatus({ loading: false });
        });
    }, [activeStep, execing, nextStep, report]);
  
    const handleExec = useCallback(() => {
      setError(null);
      setStatus({ loading: true });
      setLoading(true);
      stepsRef.current[activeStep]
        .exec(report)
        .then(() => {
          nextStep();
        })
        .catch(report)
        .finally(() => {
          setLoading(false);
          setStatus({ loading: false });
          setExecing(true);
        });
    }, [activeStep, nextStep, report]);
  
    useEffect(() => {
      setExecing(true);
    }, []);

    useEffect(() => {
      handleExec();
    }, []);
    return (
      <>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            padding: 4.5,
            borderRadius: 2.5,
            background: '#37383D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {steps.map(({ content, label, optional }, index) => (
            <Step key={index}>
              <StepLabel
                error={activeStep === index && !!error}
                icon={
                  activeStep === index ? (
                    error ? undefined : status?.loading ? (
                      <CircularProgress size={24} />
                    ) : undefined
                  ) : undefined
                }
                optional={
                  <Typography sx={{color: "whitesmoke"}}>
                    {
                      activeStep === index
                      ? error
                        ? error.message ?? optional
                        : status
                        ? status?.message ?? optional
                        : optional
                      : optional
                    }
                  </Typography>
                  
                }
              >
                <Typography variant='h5' sx={{color: 'whitesmoke'}}>
                  {label}  
                </Typography>
              </StepLabel>
              <StepContent>
                <Typography variant='h5' sx={{color: 'whitesmoke'}}>
                  {content}  
                </Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length ? (
          <Button fullWidth onClick={onDone} variant="contained" sx={{mr: 2, px: 5, borderRadius: 10, bgcolor: '#D359BD', '&:hover': {backgroundColor: 'rgba(211, 89, 189, 0.8)'}}}>
            <Typography sx={{color: 'whitesmoke'}}>
              Finish
            </Typography>
          </Button>
        ) : (
          <>
          </>
        )}
      </>
    );
  };
  
  export default React.memo(Steps);
  