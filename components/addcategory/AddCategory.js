import * as React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Toolbar from '@mui/material/Toolbar'
import Paper from '@mui/material/Paper'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Addcategory2 from './AddCategory2'
import AddCategory3 from './AddCategory3'
import { useState } from 'react'

export default function Addcategory() {
  const [activeStep, setActiveStep] = useState(0)
  const [disable, setdisable] = useState(true)

  const handleNext = () => {
    setActiveStep(activeStep + 1)
  }

  const disableNext = () => {
    setdisable(!disable)
  }
  const steps = ['Category', 'Product Review']

  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Addcategory2 handleNext={handleNext} disableNext={disableNext} />
      case 1:
        return <AddCategory3 />
      default:
        throw new Error('Unknown step')
    }
  }

  const handleBack = () => {
    setActiveStep(activeStep - 1)
  }

  return (
    <>
      <CssBaseline />
      <AppBar
        position='absolute'
        color='default'
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: t => `1px solid ${t.palette.divider}`
        }}
      >
        <Toolbar>
          <Typography variant='h6' color='inherit' noWrap>
            Category page
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component='main' maxWidth='sm' sx={{ mb: 4 }}>
        <Paper variant='outlined' sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component='h1' variant='h4' align='center'>
            Add Category to product
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant='h5' gutterBottom>
                Thank you for your order.
              </Typography>
              <Typography variant='subtitle1'>
                Your order number is #2001539. We have emailed your order confirmation, and will send you an update when
                your order has shipped.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
              {getStepContent(activeStep)}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}
              </Box>
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </>
  )
}
